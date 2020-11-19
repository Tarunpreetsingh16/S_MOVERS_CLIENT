import React from 'react';

export const BookingsCard = ({ booking }) => {
	return (
		<section className='flexDisplayColumn cardContainer padding2 pointer'>
			<h3 className='fontSize1_5 fontWeight400'>
				<strong className='fontSize2_5'>
					{booking.driverEmail ? 'Driver' : 'Helper'}
				</strong>
			</h3>
			<h3 className='fontSize1_5 fontWeight400'>
				<strong className='fontSize1_5'>Name: </strong>{' '}
				{booking.driverName ? booking.driverName : booking.helperName}
			</h3>
			<h3 className='fontSize1_5 fontWeight400'>
				<strong className='fontSize1_5'>Date: </strong>
				{new Date(booking.date).toLocaleDateString()}
			</h3>
			{booking.carType ? (
				<h3 className='fontSize1_5 fontWeight400'>
					<strong className='fontSize1_5'>Car Type: </strong>
					{booking.carType}
				</h3>
			) : null}
			<div>
				<h3 className='fontSize1_5 fontWeight400'>
					<strong className='fontSize1_5 '>Pick up: </strong>{' '}
					{`${booking.pickUp.number} ${booking.pickUp.street}, ${booking.pickUp.city}, ${booking.pickUp.province}, ${booking.pickUp.zipCode}`}
				</h3>
			</div>
			<div>
				<h3 className='fontSize1_5 fontWeight400'>
					<strong className='fontSize1_5 '>Drop up: </strong>
					{`${booking.drop.number} ${booking.drop.street}, ${booking.drop.city}, ${booking.drop.province}, ${booking.drop.zipCode}`}
				</h3>
			</div>

			<div>
				<h3 className='fontSize1_5 fontWeight400'>
					<strong className='fontSize1_5 '>Purpose: </strong> {booking.motive}
				</h3>
			</div>
		</section>
	);
};

export default BookingsCard;