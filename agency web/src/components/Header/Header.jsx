import React from 'react';
import './Header.scss';

const Header = () => {
	return (
		<header className='header'>
			<div className='header__bar'>
				<div className='logo'>
					<h1>Logo</h1>
				</div>
				<nav className='navigation'>
					<ul className='navigation__list'>
						<li className='navigation__item'>work</li>
						<li className='navigation__item'>services</li>
						<li className='navigation__item'>contact</li>
					</ul>
				</nav>
				<div className='header__menu'>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
			<div className='header__title'>
				<h1 className='header__banner'>
					<span>Creative</span>
					<span>Innovative</span>
					<span>Design Agency</span>
				</h1>
				<p className='header__description'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Lorem ipsum dolor sit amet, consectetur adipiscing
					elit.Lorem ipsum dolor sit amet, consectetur adipiscing
					elit.Lorem ipsum dolor sit amet, consectetur adipiscing
					elit.
				</p>
			</div>
		</header>
	);
};

export default Header;
