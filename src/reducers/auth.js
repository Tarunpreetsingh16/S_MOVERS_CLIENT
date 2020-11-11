/*Reducer - Auth - Contains reducer for Authorization actions */
import { SIGNUP_FAIL, SIGNUP_SUCCESS } from './../actions/types';
const initialState = {
	token: localStorage.getItem('jwt'),
	user: null,
	isAuthenticated: false,
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case SIGNUP_SUCCESS:
			console.log(payload);
			return state;
		case SIGNUP_FAIL:
			console.log(payload);
			return state;
		default:
			return state;
	}
};
