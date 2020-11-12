import { SIGNUP_FAIL, SIGNUP_SUCCESS } from './types';
import { typeOfUsers } from './../lib/userTypes';
import axios from 'axios';
/*Action - signUp - To signup a user using the details provided from the form
 */
export const signUp = (userData) => async (dispatch) => {
	const config = {
		header: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const res = await axios.post('/api/bookers', userData, config);
		dispatch({
			type: SIGNUP_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: SIGNUP_FAIL,
			payload: err.response.data.errors,
		});
	}
};
