import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import BookingsCard from './BookingsCard';
//Redux
import { connect } from 'react-redux';
import { getPreviousBookings } from '../../actions/bookers';
import { getUpComingBookings } from '../../actions/booking';
export const Bookings = ({
	getPreviousBookings,
	previousBookings,
	isAuthenticated,
	getUpComingBookings,
	futureBookings,
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
			getUpComingBookings();
		}
	};
	console.log(futureBookings);
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
			if (localStorage.typeOfUser == 'booker')
				document.getElementById('prevBookings').classList.remove('btn-active');
		}
	};
	const buttons = (
		<div className='flexDisplay justifyCenter'>
			{localStorage.typeOfUser == 'booker' ? (
				<button
					className='btn fontSize1_5 margin2 btn-theme colorWhite'
					id='prevBookings'
					onClick={changeBookingsState}
				>
					Previous Bookings
				</button>
			) : null}
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
			if (booking)
				/*If the booking is present then show it to the user by sending data to the Booking Card */
				return (
					<BookingsCard
						key={booking._id}
						booking={booking}
						index={index}
						dataFromParent={false}
					/>
				);
		});
	/*Display the  future booking to the user if there were any fetched form the database*/
	const upcomingBookings =
		futureBookings != null &&
		futureBookings.length > 0 &&
		futureBookings.map((booking, index) => {
			if (booking)
				/*If the booking is present then show it to the user by sending data to the Booking Card */
				return (
					<BookingsCard
						key={booking._id}
						booking={booking}
						index={index}
						dataFromParent={true}
					/>
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
				) : upcomingBookings ? (
					upcomingBookings
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
	getUpComingBookings: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	previousBookings: state.bookers.previousBookings,
	isAuthenticated: state.auth.isAuthenticated,
	futureBookings: state.booking.bookings,
});
export default connect(mapStateToProps, {
	getPreviousBookings,
	getUpComingBookings,
})(Bookings);
