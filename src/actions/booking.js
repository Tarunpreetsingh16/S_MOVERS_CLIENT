import axios from 'axios';
import {
	PROVIDE_AVAILABILITY,
	PROVIDE_AVAILABILITY_FAIL,
	GET_AVAILABILTIY,
	GET_AVAILABILTIY_FAIL,
	SEND_BOOKING_PROPOSAL,
	SEND_BOOKING_PROPOSAL_FAIL,
	BOOKING_RESPONSE,
	BOOKING_RESPONSE_FAIL,
	VIEW_UPCOMING_BOOKINGS,
	CANCEL_BOOKING,
	CANCEL_BOOKING_FAIL,
	POST_RATING,
	POST_RATING_FAIL,
} from './types';

import setAuthToken from '../lib/setAuthToken';

/*Action - provideAVailability - To provide the availability
 */
export const provideAvailability = (data) => async (dispatch) => {
	if (localStorage.jwt && localStorage.typeOfUser) {
		setAuthToken(localStorage.jwt);
	}
	const config = {
		header: {
			'Content-Type': 'application/json',
		},
	};
	try {
		let res;
		if (localStorage.typeOfUser == 'driver')
			res = await axios.put('api/drivers', data, config);
		else if (localStorage.typeOfUser == 'helper')
			res = await axios.put('api/helpers', data, config);
		dispatch({
			type: PROVIDE_AVAILABILITY,
		});
		var promise = new Promise((resolve) => {
			resolve(res);
		});
		return promise;
	} catch (err) {
		dispatch({
			type: PROVIDE_AVAILABILITY_FAIL,
		});
		var promise = new Promise((resolve) => {
			resolve(err.response);
		});
		return promise;
	}
};

/*Action - getAvailability - To provide the availability
 */
export const getAvailability = () => async (dispatch) => {
	if (localStorage.jwt && localStorage.typeOfUser) {
		setAuthToken(localStorage.jwt);
	}
	const config = {
		header: {
			'Content-Type': 'application/json',
		},
	};
	try {
		let res;
		if (localStorage.typeOfUser == 'driver')
			res = await axios.get('api/drivers/availability', null, config);
		else if (localStorage.typeOfUser == 'helper')
			res = await axios.get('api/helpers/availability', null, config);
		dispatch({
			type: GET_AVAILABILTIY,
			payload: res.data,
		});
		var promise = new Promise((resolve) => {
			resolve(res);
		});
		return promise;
	} catch (err) {
		dispatch({
			type: GET_AVAILABILTIY_FAIL,
		});
		var promise = new Promise((resolve) => {
			resolve(err.response);
		});
		return promise;
	}
};

/*Action - bookDriver -TO book a driver
 */
export const bookDriver = (data) => async (dispatch) => {
	if (localStorage.jwt && localStorage.typeOfUser) {
		setAuthToken(localStorage.jwt);
	}
	const config = {
		header: {
			'Content-Type': 'application/json',
		},
	};
	try {
		let res;
		res = await axios.post('api/bookers/bookDriver', data, config);
		dispatch({
			type: SEND_BOOKING_PROPOSAL,
		});
		var promise = new Promise((resolve) => {
			resolve(res);
		});
		return promise;
	} catch (err) {
		dispatch({
			type: SEND_BOOKING_PROPOSAL_FAIL,
			payload: err.response.data.errors,
		});
		var promise = new Promise((resolve) => {
			resolve(err.response);
		});
		return promise;
	}
};
/*Action - bookhelper -TO book a helper
 */
export const bookHelper = (data) => async (dispatch) => {
	if (localStorage.jwt && localStorage.typeOfUser) {
		setAuthToken(localStorage.jwt);
	}
	const config = {
		header: {
			'Content-Type': 'application/json',
		},
	};
	try {
		let res;
		res = await axios.post('api/bookers/bookHelper', data, config);
		dispatch({
			type: SEND_BOOKING_PROPOSAL,
		});
		var promise = new Promise((resolve) => {
			resolve(res);
		});
		return promise;
	} catch (err) {
		dispatch({
			type: SEND_BOOKING_PROPOSAL_FAIL,
			payload: err.response.data.errors,
		});
		var promise = new Promise((resolve) => {
			resolve(err.response);
		});
		return promise;
	}
};

/*Action - bookingReponse -to accept or reject the booking request
 */
export const bookingResponse = (data) => async (dispatch) => {
	try {
		console.log(data.id, data.accept);
		let res;
		if (String(data.typeOfUser).toLowerCase() == 'driver')
			res = await axios.put(
				`/api/drivers/bookingProposal/${data.id}/${data.accept}`
			);
		else
			res = await axios.put(
				`/api/helpers/bookingProposal/${data.id}/${data.accept}`
			);
		dispatch({
			type: BOOKING_RESPONSE,
		});
		var promise = new Promise((resolve) => {
			resolve(res);
		});
		return promise;
	} catch (err) {
		console.log(err.response);
		dispatch({
			type: BOOKING_RESPONSE_FAIL,
			payload: err.response.data.errors,
		});
		var promise = new Promise((resolve) => {
			resolve(err.response);
		});
		return promise;
	}
};

/*Action - getUpComingBookings -to get the upcoming bookings
 */
export const getUpComingBookings = () => async (dispatch) => {
	if (localStorage.jwt && localStorage.typeOfUser) {
		setAuthToken(localStorage.jwt);
	}
	try {
		const config = {
			header: {
				'Content-Type': 'application/json',
			},
		};
		let res;
		if (localStorage.typeOfUser == 'booker')
			res = await axios.get('api/bookers/futureBookings', null, config);
		else if (localStorage.typeOfUser == 'driver')
			res = await axios.get('api/drivers/futureBookings', null, config);
		else if ((localStorage.typeOfUser = 'helper'))
			res = await axios.get('api/helpers/futureBookings', null, config);
		dispatch({
			type: VIEW_UPCOMING_BOOKINGS,
			payload: res.data,
		});
	} catch (err) {}
};

/*Action - cancelBooking -to cancel an upcoming booking
 */
export const cancelBooking = (id, bookerEmail) => async (dispatch) => {
	if (localStorage.jwt && localStorage.typeOfUser) {
		setAuthToken(localStorage.jwt);
	}
	try {
		const config = {
			header: {
				'Content-Type': 'application/json',
			},
		};

		let res;
		if (localStorage.typeOfUser == 'booker')
			res = await axios.get(`/api/bookers/cancelBooking/${id}`);
		else if (localStorage.typeOfUser == 'driver')
			res = await axios.post(
				`/api/drivers/cancelBooking/${id}`,
				{
					bookerEmail,
				},
				config
			);
		if (localStorage.typeOfUser == 'helper')
			res = await axios.post(
				`/api/helpers/cancelBooking/${id}`,
				{
					bookerEmail,
				},
				config
			);
		dispatch({
			type: CANCEL_BOOKING,
		});
		var promise = new Promise((resolve) => {
			resolve(res);
		});
		return promise;
	} catch (err) {
		dispatch({
			type: CANCEL_BOOKING_FAIL,
		});
		var promise = new Promise((resolve) => {
			resolve(err.response);
		});
		return promise;
	}
};

/*Action - postRating -to cancel an upcoming booking
 */
export const postRating = (id, rating) => async (dispatch) => {
	if (localStorage.jwt && localStorage.typeOfUser) {
		setAuthToken(localStorage.jwt);
	}
	try {
		const config = {
			header: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.post(`api/bookers/rate/${id}/${rating}`);
		dispatch({
			type: POST_RATING,
		});
		var promise = new Promise((resolve) => {
			resolve(res);
		});
		return promise;
	} catch (err) {
		dispatch({
			type: POST_RATING_FAIL,
		});
		var promise = new Promise((resolve) => {
			resolve(err.response);
		});
		return promise;
	}
};
