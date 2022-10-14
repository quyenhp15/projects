import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import './Footer.scss';

const Footer = () => {
	return (
		<footer className='footer'>
			<div className='footer__container'>
				<SectionTitle>Contact</SectionTitle>
				<div className='footer__contact'>
					<h3 className='footer__info'>
						<span>contact@website.com</span>
						<span>+0 0000 0000</span>
					</h3>
				</div>
				<ul className='footer__list'>
					<li>Twitter</li>
					<li>LinkedIn</li>
					<li>Dribble</li>
					<li>Youtube</li>
					<li>Instagram</li>
					<li>Facebook</li>
				</ul>
			</div>
			<div className='footer__terms'>
				<div className='footer__company-name'>
					<span>2022 Creatives</span>
				</div>
				<div className='footer__privacy'>
					<span>Privacy Policy</span>
					<span>Terms and Condition</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
