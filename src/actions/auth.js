import { SIGNUP_FAIL, SIGNUP_SUCCESS } from './types';
import { typeOfUsers } from './../lib/userTypes';
import axios from 'axios';
/*Action - signUp - To signup a user using the details provided from the form
 */
export const signUp = ({ userData, typeOfUser }) => async (dispatch) => {
	const config = {
		header: {
			'Content-Type': 'application/json',
		},
	};
	const body = JSON.stringify({ ...userData });
	try {
		let res;
		if (typeOfUser == typeOfUsers.BOOKER) {
			res = await axios.post('/api/bookers', body, config);
		}
		dispatch({
			type: SIGNUP_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: SIGNUP_FAIL,
			payload: res.data,
		});
	}
};
