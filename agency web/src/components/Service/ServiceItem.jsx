import React from 'react';
import './ServiceItem.scss';

const serviceList = [
	{
		title: 'Graphic Design',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur',
		price: 400,
	},
	{
		title: 'Product Design',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur',
		price: 350,
	},
	{
		title: 'Web Design',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur',
		price: 800,
	},
	{
		title: 'Video Editing',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur',
		price: 500,
	},
];

const ServiceItem = () => {
	return (
		<div className='service'>
			{serviceList.map((service) => (
				<div className='service__item'>
					<div className='service__info'>
						<h3>{service.title}</h3>
						<p>{service.description}</p>
						<button>
							See details <span>{String.fromCharCode('8594')}</span>
						</button>
					</div>
					<button className='service__price'>
						Starting at ${service.price}
					</button>
				</div>
			))}
		</div>
	);
};

export default ServiceItem;
