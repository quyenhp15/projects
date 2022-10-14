import React from 'react';
import './SectionTitle.scss';

const SectionTitle = (props) => {
	return (
		<div className='center-text'>
			<h1 className='section-heading'>{props.children}</h1>
		</div>
	);
};

export default SectionTitle;
