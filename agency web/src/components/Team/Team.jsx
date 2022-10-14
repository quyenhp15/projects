import React from 'react';
import './Team.scss';
import SectionTitle from '../SectionTitle/SectionTitle';

const listImage = [
	'https://s3-alpha-sig.figma.com/img/660e/3a0c/1bb9b1190767e1ab868c9f2107b2611f?Expires=1665360000&Signature=W~j2ltkQrlRUPV~NG5ohcw~cRW-zPOgGUoNmE5egL740Ky5oOIysOKGkRhc6kTP4JF-PK8P8rdx2yLF8eoDLw4Zd14D8jG9KSpVPzyKLTo-le2LQ34Ch8-SAIoLDD03rOBjRhoBhTg6yfobKoABQxPE0AlQgS9qXQwTL8MtGYpFIhyN1TMuZ1RsWkSSTbeY-maSfMzFQi4vw8NF8sclzAWmoSwwARDShtZ8owxrxHXUMLPbK5LE~YmzmP1IcBW9LJddecifGklJ84M~cxBEm9CUAy2WqwOG-h16c7m9iQkLy8UhIxJkrwK~Hn8lvnpm87IXcuBw2IVR5i3q-Bv--NA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
	'https://s3-alpha-sig.figma.com/img/13ca/d252/d5a4dfecac34f42f024ba42761609506?Expires=1665360000&Signature=JGdcFm7YceZCX42t-qshG7wrGAjPlWDF6vQzZ0BrJTq57t~Kd0FOOoM652J05Q~h5uplgdPdCWGahx3nMODhruschKSflmaiTkgC8K3yG8Lt-1EzBkQ84y880qwfZnOY2sb6p7LeEA5kqbTiM-n0OLzJdQxzVcE1f8W6hGnnf~ImP7q4PDGbAdrVYhqKqmml3hEQqo7EGcl-9qA5rrjJQmoSR1nwuGvTaTrCTl7RRcl2Amha01HVLpTvoiTeOYoQn8~-6KqyfAVAJzXm4l5oZ5v1uI2rOj8IygLPREbF6Na7BlpED5civailtHtmXGItyekVUCj8-80D69JenEnWwg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
	'https://s3-alpha-sig.figma.com/img/89f1/bbee/ef297b9cd1332142cb7c40aa8d4cd5e4?Expires=1665360000&Signature=epiqNU~aWuhj8LjciKWi3oDR3sLrNrhH-9L7T8ZKcCso-AYjyK1Y7hdMBbOc~aKC63TK2WhHraIdSTe-N12wKBXIj6PKiHghgb9JFlBP2TZl3Ax0AZoAY9LSGatiHJMyAU8ihCySdOST0LtHT3RqVFbmUWOoUTb9nH1b8990ezneyJ04wuZKRHXA9X4Knvqaxg794QRWB06EUJa29NpkdOc6M5BlJ1pywQYbjtNk0zpKaNTHVfmAC2VFY9PH88NJbdoGsclrc6DWlsXpfNUDolAVoocn0zLid9dNHiWadrgINCUXOrZ28r43NRQNLx-U-RVs0kczSTxNSL6VGMezsg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
	'https://s3-alpha-sig.figma.com/img/5051/6e00/656f68ec7696af2d0ec35bbf29cd816b?Expires=1665360000&Signature=Z-djjWWIsRNMdfspAph4mr3w6CzS7mCNAT68zxTXVCnyVmrtKTHjMYuqul2XoNSFBhcdAtv5CiweCYDHNtoqlyiB7tPvQjUCvJVYjtxcSLnlxlgDdzxJD~Iss2WGv-UIEJy2NsMeB7-oAiKjBc7Dkp9B3jeJIuNdd16DAaVdAUUjHmO1QT76tiweM~XO~S9nXxniidPJHv479sOmx0w47mQTOZPql948YZJIONB53UG-7gVGvqurDzuE~YWVxHum3yu9v6XkAB4XDnyKHsT9M02RUaj4ZHXa4K93PYsFwRQFziD9wwh-iO4BiniI9Z~iEINPBQ3tDqsufutEs45yCw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
];

const Team = () => {
	return (
		<section className='team'>
			<SectionTitle>Our Team</SectionTitle>
			<div className='center-text'>
				<p className='team__description'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Lorem ipsum dolor sit amet, consectetur adipiscing
					elit.Lorem ipsum dolor sit amet, consectetur adipiscing
					elit.Lorem ipsum dolor sit amet, consectetur adipiscing
					elit.
				</p>
			</div>
			<div className='composition'>
				{listImage.map((img) => (
					<figure className='composition__item'>
						<img className='composition__photo' src={img} alt='' />
						<figcaption className='composition__caption'>
							<h2>Jhon Doe</h2>
							<p>Digital Marketing Manager</p>
						</figcaption>
					</figure>
				))}
			</div>
		</section>
	);
};

export default Team;
