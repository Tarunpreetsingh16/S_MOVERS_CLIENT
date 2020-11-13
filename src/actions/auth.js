import {
	SIGNUP_FAIL,
	SIGNUP_SUCCESS,
	CLEAR_ERRORS,
	AUTH_ERROR,
	LOAD_USER,
} from './types';
import setAuthToken from '../lib/setAuthToken';
import axios from 'axios';

/*Action - loadUser- To laod the a user using the token received stored
 */
export const loadUser = (path) => async (dispatch) => {
	console.log(path);
	if (localStorage.jwt && localStorage.typeOfUser) {
		setAuthToken(localStorage.jwt);
	}
	try {
		let res;
		if (localStorage.typeOfUser === 'booker')
			res = await axios.get('/api/auth/1');
		else if (localStorage.typeOfUser === 'driver')
			res = await axios.get('/api/auth/2');
		else if (localStorage.typeOfUser === 'helper')
			res = await axios.get('/api/auth/3');

		dispatch({
			type: LOAD_USER,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};
/*Action - signUp - To signup a user using the details provided from the form
 */
export const signUp = (userData) => async (dispatch) => {
	const config = {
		header: {
			'Content-Type': 'application/json',
		},
	};
	try {
		let res;
		if (userData.typeOfUser === 'booker')
			res = await axios.post('/api/bookers', userData, config);
		else if (userData.typeOfUser === 'driver')
			res = await axios.post('/api/drivers', userData, config);
		else if (userData.typeOfUser === 'helper')
			res = await axios.post('/api/helpers', userData, config);
		dispatch({
			type: SIGNUP_SUCCESS,
			payload: {
				data: res.data,
				typeOfUser: userData.typeOfUser,
			},
		});
	} catch (err) {
		dispatch({
			type: SIGNUP_FAIL,
			payload: err.response.data.errors,
		});
	}
};

export const clearErrors = () => (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};
