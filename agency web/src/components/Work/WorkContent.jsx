import React from 'react';
import './WorkContent.scss';

const workList = [
	'https://s3-alpha-sig.figma.com/img/60de/726b/85616efdcd0ad46c1489a6ce58500852?Expires=1665360000&Signature=HnuXrO-B7MaOTqMg8dl2NQpx8-4pYV2sH~ENEeDnthS8pw6hSaRLn-~Z~hAOOwrcp3crLWP~qFcogMPeabz7JQQ26Hzy121GI6TmjM7fG1s5Wce6z1EAM-TWTb6-dbZQIp9IkdHRH86gd~wMI14cBhb2QwPEYW5zXIUUCfzry25au-TgIu3kqnKtQ6LcZf2qqp3VwjF53nyi81bN9iMgQ8aJXcaRO8JCUe6az0nh6HfcgxTrkcDKdogSjoZJYpTraLPJv~cp-sT93h-K9MdQqW9xvF2V7Y8vDKP2KPG7mrCc7vT5W~8zZrlQDSs-ZmJA7FesjZ4hiqHFc9dP-qE6Eg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
	'https://s3-alpha-sig.figma.com/img/f1b7/66d6/e9191ecbdf3d962d4a6ed53e9d38c0b9?Expires=1665360000&Signature=MKfk5MBveujO58rFjimIQ03iTvSvSfZps-IPRNoynvKAchDbRKVzqfudBZ1wG5feSloxjv3ONdzCVCoW1Kx1ZKZB7oAClg2UzirRGvI6Je-iTv3195Bk~HVtuCBiDjZ5-P-pKRVfDdanOlA24sVsnJGVNkrh3UfJDe958MvO9PjLuVOkae~wg59ejhWVx1DPiP-8dDoHC8zFA8mhiCMLtWQoRRntzTa1zMckGtHMlj~2fUAvX40OujCAndlP6WmF1cnpamfJCQN3F1As9tk9TLly6cGWqoAq7LAqPxVrwFhQLHYJmQjwJdHRokEWQBdvvJN6o0U-YEGLQjb9d1TlAg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
	'https://s3-alpha-sig.figma.com/img/15b1/576c/8efbb7b229b1eed47e0c3ca344f6dcb3?Expires=1665360000&Signature=N7YzX4GNDo4gI2AKo9Cz08nCq8yxalCzSS2Nzf8T06XfWDqAYxe8NflgWuMTeJW-GLakLTdU8Q7xX~JqKorDsSZ9HTiMx628XSb4mX4GbW5i-pvAyFgPDI7~P2iBh1xdbGU3fYLER8J-WJoLFa5py58j71Koy6yr4~3hANKb5X-BIlecKVSyTu7Zq-CAXs39ijMsos7fTfhMaPNtPV-THCquPvrlv4yqe2UGJE-DlY7Y2a1SpsdkVNoONZQ6qNMxsPBdqjbMYDsw97v9lT24FRxNPirPmsiLi-ImvK9h6CaK2GKe9NHGU3pX~SKWYbV-2IP5~N2tGTUjZKHgjxiA0A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
	'https://s3-alpha-sig.figma.com/img/4be8/c4f7/9a81c7bb83dd79010c866b429ed74b18?Expires=1665360000&Signature=AapvIwuT~6NQ-~7dWfhHBGZZIXMPTSnCd2tpGQO0omfUbfpYxxuvqMhkRUve5DXDLxdZOgXaxc6GCQcpvmWeqNA2RaI-d8kIA2wsebxDbBXAX14JBeBwSDv1x1a5nlcc5Ep6RtUMi-2xzJqRxO641v9ZZaVlCy5cYkMGLUorISBtb3W53XM1s1HIpGr4bbFOfsA9AEerWqt1Gc93cuimpvzDzrtRsFmpgnSD9uOtVNpGFqwLH3h9JdVg65ZCX8jDxS06QGluemcA9w3SUbGTSlBObqrToDcr74JRv1fNFj-IsDb~ZujyFk89bvCFPP5iYAO9pRWbck-YBsKbnRPVQw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
	'https://s3-alpha-sig.figma.com/img/27dd/d94f/99a9b7c9516d14e4b776e44787bd3e80?Expires=1665360000&Signature=dQaU6DDWpQkqIap154J2y9yW8u2SCPjNzz1f6eLT~MB2iUHSzjM0BEoeunazlhUkK14nbtyT49KY~rMcvkBS1htOxs9Bdio-xdlIa1UBlHxVLkG0BcwSusvkGXz6f09Bj~0FL58hdPEwEGw12~aukGSVKSB6TP~QGEHTRIzD~UCTMUsm0H82JhOiNn4-bn6h9iBqvryJxK~ZFF~I3rK9GUzhLFEy6vlllmEXfo0KxOEBE-CoyC~VpyV5gfT7X2AUM8TekSF-8LzuXp52sZ~w1oSLKThkVDgeX9~ueQUFmfvUtAwCSeQpxhk9dfwCNlAqAhXCsPgFwy9xCGJ7nk59TA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
	'https://s3-alpha-sig.figma.com/img/2e1b/b7b7/3db4415e6b27882b5594e5d56d7f3d01?Expires=1665360000&Signature=IzsTqNT7o1m6fw9iBVPWN~ubCZDCUaZIR6AQO7qYGpeAuNMzr9pMsQc~qDYfcA8df50HI0rYlTonmTlkdaUM887yy7PlDFqxYtXlrJjmjAqcbG4TdHIsuPNICnxwHCrq-pSFsoB2MOKHMQtYUwV8C7OPwjPxS0g4MsMnuXRJJXjrPXk-TElml~zU3PlKgWc~gvMp5K3D3eQ84KRh8RSGSxl8hAEVOb1dC2c15Mmcn1PfyrusAvwFzK1stSeFjB4rpR0BMoL66NNgH8ppo8G7SlSLjcMGmQbYYC5LXcdIehlvJbhc64dOr7cJs9tR0hcPUP94nfW-DJuwR~J62xOmJg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
];

const WorkContent = () => {
	return (
		<div className='work-content'>
			{workList.map((work) => (
				<figure
					className='work-content__figure'
					key={Math.random(100000)}
				>
					<img className='work-content__image' src={work} alt='img' />

					<figcaption className='work-content__caption'>
						<h3>Abstract Design</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							orem ipsum dolor sit amet, consectetur adipiscing
							elit.Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Lorem ipsum dolor sit amet, consectetur adipiscing
							elit.
						</p>
						<a href='/'>See project &#8594; </a>
					</figcaption>
				</figure>
			))}
		</div>
	);
};

export default WorkContent;
