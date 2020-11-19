import {
	SIGNUP_FAIL,
	SIGNUP_SUCCESS,
	CLEAR_ERRORS,
	AUTH_ERROR,
	LOAD_USER,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_USER,
	UPDATE_BOOKER_INFO,
	UPDATE_BOOKER_INFO_FAIL,
	UPDATE_PASSWORD_FAIL,
	UPDATE_PASSWORD,
	UPDATE_DRIVER_INFO,
	UPDATE_DRIVER_INFO_FAIL,
	DELETE_ACCOUNT_FAIL,
} from './types';
import setAuthToken from '../lib/setAuthToken';
import axios from 'axios';

/*Action - loadUser- To laod the a user using the token received stored
 */
export const loadUser = () => async (dispatch) => {
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
			payload: { token: localStorage.jwt, user: res.data },
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
		});
	} finally {
		return new Promise((resolve) => {
			resolve(true);
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
		return new Promise((resolve) => {
			resolve(true);
		});
	} catch (err) {
		dispatch({
			type: SIGNUP_FAIL,
			payload: err.response.data.errors,
		});
	}
};
/*Action - login - To login a user using the details provided from the form
 */
export const login = (userData) => async (dispatch) => {
	const config = {
		header: {
			'Content-Type': 'application/json',
		},
	};
	try {
		let res;
		if (userData.typeOfUser === 'booker')
			res = await axios.post('/api/bookers/login', userData, config);
		else if (userData.typeOfUser === 'driver')
			res = await axios.post('/api/drivers/login', userData, config);
		else if (userData.typeOfUser === 'helper')
			res = await axios.post('/api/helpers/login', userData, config);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: {
				data: res.data,
				typeOfUser: userData.typeOfUser,
			},
		});
	} catch (err) {
		dispatch({
			type: LOGIN_FAIL,
			payload: err.response.data.errors,
		});
	} finally {
		return new Promise((resolve) => {
			resolve(true);
		});
	}
};

/*Action - updateBookerInfo - To udpate a user from the system*/
export const updateBookerInfo = (data) => async (dispatch) => {
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
		const filteredData = { ...data };
		if (!data.email || data.email.trim().length == 0) {
			delete filteredData['email'];
		}
		if (!data.phone || data.phone.trim().length == 0) {
			delete filteredData['phone'];
		}
		if (
			!(
				Object.keys(filteredData).length === 0 &&
				filteredData.constructor === Object
			)
		) {
			res = await axios.post('/api/bookers/update', filteredData, config);
			dispatch({
				type: UPDATE_BOOKER_INFO,
			});
		}
	} catch (err) {
		dispatch({
			type: UPDATE_BOOKER_INFO_FAIL,
			payload: err.response.data.errors,
		});
	} finally {
		return new Promise((resolve) => {
			resolve(true);
		});
	}
};
/*Action - updateDriverInfo - To update a driver in the system*/
export const updateDriverInfo = (data) => async (dispatch) => {
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
		const filteredData = { ...data };
		if (!data.email || data.email.trim().length == 0) {
			delete filteredData['email'];
		}
		console.log(4);
		if (!data.carType || data.carType.trim().length == 0) {
			delete filteredData['carType'];
		}
		console.log(3);
		if (!data.location || data.location.trim().length == 0) {
			delete filteredData['location'];
		}
		console.log(filteredData);
		if (
			!data.drivingExperience ||
			String(data.drivingExperience).trim().length == 0
		) {
			delete filteredData['drivingExperience'];
		}
		if (
			!(
				Object.keys(filteredData).length === 0 &&
				filteredData.constructor === Object
			)
		) {
			res = await axios.post('/api/drivers/update', filteredData, config);
			dispatch({
				type: UPDATE_DRIVER_INFO,
			});
		}
	} catch (err) {
		dispatch({
			type: UPDATE_DRIVER_INFO_FAIL,
			payload: err.response.data.errors,
		});
	} finally {
		return new Promise((resolve) => {
			resolve(true);
		});
	}
};
/*Action - updatePassword - To update a password for a a user logged in*/
export const updatePassword = (userData) => async (dispatch) => {
	if (localStorage.jwt && localStorage.typeOfUser) {
		setAuthToken(localStorage.jwt);
	}
	const config = {
		header: {
			'Content-Type': 'application/json',
		},
	};
	let res;
	try {
		if (localStorage.typeOfUser === 'booker')
			res = await axios.post('/api/bookers/updatePassword', userData, config);
		else if (localStorage.typeOfUser === 'driver')
			res = await axios.post('/api/drivers/updatePassword', userData, config);
		else if (localStorage.typeOfUser === 'helper')
			res = await axios.post('/api/helpers/updatePassword', userData, config);
		dispatch({ type: UPDATE_PASSWORD });
		var promise = new Promise((resolve) => {
			resolve(res);
		});
		return promise;
	} catch (err) {
		dispatch({
			type: UPDATE_PASSWORD_FAIL,
			payload: err.response.data.errors,
		});
		var promise = new Promise((resolve) => {
			resolve(err.response);
		});
		return promise;
	}
};
/*Action - logout - To logout a user from the system*/
export const logout = () => async (dispatch) => {
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
		res = await axios.get('/api/bookers/logout', null, config);
		if (res.data.logout) {
			dispatch({
				type: LOGOUT_USER,
			});
		}
	} catch (err) {
	} finally {
		return new Promise((resolve) => {
			resolve(true);
		});
	}
};
/*Action - deleteAccount - To delete a user from the system*/
export const deleteAccount = (data) => async (dispatch) => {
	if (localStorage.jwt && localStorage.typeOfUser) {
		const header = {
			'Content-Type': 'application/json',
			'x-auth-token': localStorage.jwt,
		};
		try {
			let res;
			if (localStorage.typeOfUser === 'booker')
				res = await axios.delete('/api/bookers/', { header, data });
			else if (localStorage.typeOfUser === 'driver')
				res = await axios.delete('/api/drivers/', { header, data });
			else if (localStorage.typeOfUser === 'helper')
				res = await axios.delete('/api/helpers/', { header, data });
			var promise = new Promise((resolve) => {
				resolve(res);
			});
			return promise;
		} catch (err) {
			dispatch({
				type: DELETE_ACCOUNT_FAIL,
				payload: err.response.data.errors,
			});

			var promise = new Promise((resolve) => {
				resolve(err.response);
			});
			return promise;
		}
	}
};
export const clearErrors = () => (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};
