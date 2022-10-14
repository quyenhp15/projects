import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import './Work.scss';
import WorkContent from './WorkContent';

const Work = () => {
	return (
		<section className='work'>
			<SectionTitle>Work</SectionTitle>
			<WorkContent />
			<div className='work__btn'>
				<button>See All</button>
			</div>
		</section>
	);
};

export default Work;
