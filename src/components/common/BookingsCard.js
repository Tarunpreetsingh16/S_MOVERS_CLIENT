import React, { useState } from 'react';
import {
	cancelBooking,
	getUpComingBookings,
	postRating,
} from './../../actions/booking';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPreviousBookings } from '../../actions/bookers';
export const BookingsCard = ({
	booking,
	dataFromParent,
	cancelBooking,
	postRating,
	getPreviousBookings,
	getUpComingBookings,
}) => {
	//dataFromParent = > false - from previous bookings
	//	true - from upcoming bookings
	//rating section from 1 to 5
	const rates = [1, 2, 3, 4, 5];
	const [rating, setRating] = useState(rates[rates.length - 1]);
	const deleteBooking = () => {
		cancelBooking(String(booking._id), booking.bookerEmail).then((res) => {
			if (res.status == 200) {
				getUpComingBookings();
			}
		});
	};
	const postReview = () => {
		postRating(String(booking._id), rating).then((res) => {
			if (res.status == 200) {
				getPreviousBookings();
			}
		});
	};
	const updateData = (e) => {
		setRating(e.target.value);
	};
	const giveRating = (
		<div>
			<div className='fieldSet flexDisplayColumn fontSize2_5 alignItemsCenter padding2'>
				<label htmlFor='rating' className='fontWeight500 '>
					Rating
				</label>
				<select
					name='rating'
					id='rating'
					className='padding1'
					value={rating}
					onChange={updateData}
					style={{ width: '50px' }}
				>
					{rates.map((rate) => (
						<option
							key={rate}
							value={rate}
							name='carType'
							className='fontSize1_5'
						>
							{rate}
						</option>
					))}
				</select>
			</div>
			<div>
				<input
					type='submit'
					className='btn padding1 fontSize1_5 btn-theme flexDisplay center'
					value='Post Rating'
					onClick={postReview}
				></input>
			</div>
		</div>
	);
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
				{booking.date.split('T')[0]}
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
			{dataFromParent ? (
				<div className='padding2 '>
					<input
						type='submit'
						className='btn padding1 fontSize1_5 btn-danger flexDisplay center'
						value='Cancel Booking'
						onClick={deleteBooking}
					></input>
				</div>
			) : booking.rated ? (
				<h3 className='fontSize1_5 fontWeight400'>
					<strong className='fontSize1_5'>Rating: </strong>
					{booking.rating}
				</h3>
			) : (
				giveRating
			)}
		</section>
	);
};
BookingsCard.propTypes = {
	cancelBooking: PropTypes.func.isRequired,
	postRating: PropTypes.func.isRequired,
	getPreviousBookings: PropTypes.func.isRequired,
};

export default connect(null, {
	cancelBooking,
	postRating,
	getPreviousBookings,
	getUpComingBookings,
})(BookingsCard);
