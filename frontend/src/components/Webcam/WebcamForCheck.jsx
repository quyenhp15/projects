import { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import './index.css';

const WebcamForCheck = () => {
    const [initializing, setInitializing] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

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
                setInitializing(false);
                getVideo();
            });
        };
        loadModels();
    }, []);

    function loadLabeledImages() {
        //const labels = ['Black Widow', 'Captain America', 'Hawkeye' , 'Jim Rhodes', 'Tony Stark', 'Thor', 'Captain Marvel']
        const labels = ['KhoiNguyen', 'Sergio Canu']; // for WebCam
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
            canvasRef.current.innerHTML = await faceapi.createCanvasFromMedia(
                videoRef.current
            );
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

    return (
        <div className='App'>
            <span>{initializing ? 'Initializing' : ''}</span>
            <div className='display-flex justify-content-center'>
                <video ref={videoRef} onPlay={handleVideoOnPlay}></video>
                <canvas ref={canvasRef} className='position-absolute' />
            </div>
        </div>
    );
}

export default WebcamForCheck