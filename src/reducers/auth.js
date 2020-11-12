/*Reducer - Auth - Contains reducer for Authorization actions */
import { SIGNUP_FAIL, SIGNUP_SUCCESS } from './../actions/types';
const initialState = {
	token: localStorage.getItem('jwt'),
	user: null,
	isAuthenticated: false,
	errors: [],
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case SIGNUP_SUCCESS:
			localStorage.setItem('jwt', payload.token);
			return { ...state, isAuthenticated: true, errors: [] };
		case SIGNUP_FAIL:
			localStorage.removeItem('jwt');
			return { ...state, isAuthenticated: false, errors: [...payload] };
		default:
			return state;
	}
};
