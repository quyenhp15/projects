import { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import './index.css';

const Webcam = (props) => {
	const { onReceiveImg } = props;
	const [initializing, setInitializing] = useState(false);
	const [faceDetected, setFaceDetected] = useState(false);

	const videoRef = useRef(null);
	const canvasRef = useRef(null);
	const canvasSelfieRef = useRef(null);

	const getVideo = () => {
		navigator.mediaDevices
			.getUserMedia({
				video: { width: 800, height: 600 },
			})
			.then((stream) => {
				let video = videoRef.current;
				video.srcObject = stream;
				video.play();
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		const loadModels = async () => {
			const MODEL_URL = process.env.PUBLIC_URL + '/weights';
			setInitializing(true);
			Promise.all([
				faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
				faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
				faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
				faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
			]).then(() => {
				getVideo();
				setInitializing(false);
			});
		};
		loadModels();
	}, []);

	function loadLabeledImages() {
		//const labels = ['Black Widow', 'Captain America', 'Hawkeye' , 'Jim Rhodes', 'Tony Stark', 'Thor', 'Captain Marvel']
		const labels = ['KhoiNguyen']; // for WebCam
		return Promise.all(
			labels.map(async (label) => {
				const descriptions = [];
				const img = await faceapi.fetchImage(`./images/${label}.png`);
				const detections = await faceapi
					.detectSingleFace(img)
					.withFaceLandmarks()
					.withFaceDescriptor();
				descriptions.push(detections.descriptor);
				return new faceapi.LabeledFaceDescriptors(
					label,
					descriptions
				);
			})
		);
	}

	const handleVideoOnPlay = async () => {
		const labeledDescriptors = await loadLabeledImages();
		const faceMatcher = new faceapi.FaceMatcher(
			labeledDescriptors,
			0.5
		);

		setInterval(async () => {
			canvasRef.current.innerHTML =
				await faceapi.createCanvasFromMedia(videoRef.current);
			const displaySize = {
				width: 800,
				height: 600,
			};
			faceapi.matchDimensions(canvasRef.current, displaySize);
			const detection = await faceapi
				.detectAllFaces(
					videoRef.current,
					new faceapi.TinyFaceDetectorOptions()
				)
				.withFaceLandmarks()
				.withFaceDescriptors();

			const resizeDetections = faceapi.resizeResults(
				detection,
				displaySize
			);
			canvasRef.current.getContext('2d').clearRect(0, 0, 800, 600);
			const results = resizeDetections.map((d) => {
				return faceMatcher.findBestMatch(d.descriptor);
			});
			results.forEach((result, i) => {
				const box = resizeDetections[i].detection.box;
				const drawBox = new faceapi.draw.DrawBox(box, {
					label: result.toString(),
				});
				drawBox.draw(canvasRef.current);
			});

			if (detection?.length > 0) {
				console.log('detected');
				setFaceDetected(true);
			}

			// faceapi.draw.drawDetections(
			// 	canvasRef.current,
			// 	resizeDetections
			// );
			// resizeDetections.forEach((detection) => {
			// 	const box = detection.detection.box;
			// 	const drawBox = new faceapi.draw.DrawBox(box, {
			// 		label: 'face',
			// 	});
			// 	drawBox.draw(canvasRef.current);
			// });
		}, 100);
	};

	const takeSelfie = () => {
		console.log('TAKE SELFIE BUTTON');
		// Get the exact size of the video element.
		const width = videoRef.current.videoWidth;
		const height = videoRef.current.videoHeight;

		// get the context object of hidden canvas
		const ctx = canvasSelfieRef.current.getContext('2d');

		// Set the canvas to the same dimensions as the video.
		canvasSelfieRef.current.width = width;
		canvasSelfieRef.current.height = height;

		// Draw the current frame from the video on the canvas.
		ctx.drawImage(videoRef.current, 0, 0, width, height);

		// Get an image dataURL from the canvas.
		const imageDataURL =
			canvasSelfieRef.current.toDataURL('image/png');
		onReceiveImg(imageDataURL);
	};

	const stopCam = () => {
		takeSelfie();
		const stream = videoRef.current.srcObject;
		const tracks = stream.getTracks();

		tracks.forEach((track) => {
			track.stop();
		});
	};

	useEffect(() => {
		if (faceDetected) {
			stopCam();
		}
	}, [faceDetected]);

	return (
		<div className='App'>
			<span>{initializing ? 'Initializing' : ''}</span>
			<div className='display-flex justify-content-center'>
				<video ref={videoRef} onPlay={handleVideoOnPlay}></video>
				<canvas ref={canvasRef} className='position-absolute' />
				<canvas ref={canvasSelfieRef}></canvas>
			</div>
			<button onClick={stopCam}>Stop</button>
			<button onClick={takeSelfie}>Take picture</button>
		</div>
	);
};

export default Webcam;
