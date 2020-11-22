import axios from 'axios';
import {
	PROVIDE_AVAILABILITY,
	PROVIDE_AVAILABILITY_FAIL,
	GET_AVAILABILTIY,
	GET_AVAILABILTIY_FAIL,
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
