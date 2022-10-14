import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import ServiceItem from './ServiceItem';
import './Services.scss';

const Services = () => {
	return (
		<section className='services'>
			<SectionTitle>Services</SectionTitle>
			<ServiceItem />
		</section>
	);
};

export default Services;
