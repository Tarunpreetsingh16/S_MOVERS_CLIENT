import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import BookingsCard from './../common/BookingsCard';
//Redux
import { connect } from 'react-redux';
import { getPreviousBookings } from './../../actions/bookers';
export const Bookings = ({
	getPreviousBookings,
	previousBookings,
	isAuthenticated,
}) => {
	const [showPreviousBookings, setShowPreviousBookings] = useState(false);
	const changeBookingsState = (e) => {
		if (e.target.id === 'prevBookings') {
			setActiveLink(true);
			setShowPreviousBookings(true);
			getPreviousBookings();
		} else {
			setActiveLink(false);
			setShowPreviousBookings(false);
		}
	};

	useEffect(() => {
		setActiveLink(showPreviousBookings);
	}, []);

	const setActiveLink = (value) => {
		if (value) {
			document.getElementById('prevBookings').classList.add('btn-active');
			document
				.getElementById('upcomingBookings')
				.classList.remove('btn-active');
		} else {
			document.getElementById('upcomingBookings').classList.add('btn-active');
			document.getElementById('prevBookings').classList.remove('btn-active');
		}
	};
	const buttons = (
		<div className='flexDisplay justifyCenter'>
			<button
				className='btn fontSize1_5 margin2 btn-theme colorWhite'
				id='prevBookings'
				onClick={changeBookingsState}
			>
				Previous Bookings
			</button>
			<button
				className='btn fontSize1_5 margin2 btn-theme colorWhite'
				id='upcomingBookings'
				onClick={changeBookingsState}
			>
				Upcoming Bookings
			</button>
		</div>
	);
	/*Display the  previous booking to the user if there were any fetched form the database*/
	const prevBookings =
		previousBookings != null &&
		previousBookings.length > 0 &&
		previousBookings.map((booking, index) => {
			if (booking !== undefined)
				/*If the booking is present then show it to the user by sending data to the Booking Card */
				return (
					<BookingsCard key={booking._id} booking={booking} index={index} />
				);
		});
	return !isAuthenticated ? (
		<Redirect to='/' />
	) : (
		<Fragment>
			<section className='flexDisplayColumn justifyCenter padding2'>
				{buttons}
				{showPreviousBookings ? (
					prevBookings ? (
						prevBookings
					) : (
						<div
							className='fontSize2_5'
							style={{ display: 'block', margin: '2rem auto' }}
						>
							Start booking a service!
						</div>
					)
				) : (
					<div
						className='fontSize2_5'
						style={{ display: 'block', margin: '2rem auto' }}
					>
						Start booking a service!
					</div>
				)}
			</section>
		</Fragment>
	);
};
Bookings.propTypes = {
	getPreviousBookings: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	previousBookings: state.bookers.previousBookings,
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { getPreviousBookings })(Bookings);
