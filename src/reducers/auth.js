/*Reducer - Auth - Contains reducer for Authorization actions */
import {
	SIGNUP_FAIL,
	SIGNUP_SUCCESS,
	CLEAR_ERRORS,
	LOAD_USER,
	AUTH_ERROR,
} from './../actions/types';
const initialState = {
	token: localStorage.getItem('jwt'),
	user: null,
	isAuthenticated: false,
	errors: null,
};
export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case LOAD_USER:
			return {
				...state,
				token: payload.token,
				isAuthenticated: true,
				user: payload.user,
			};
		case SIGNUP_SUCCESS:
			localStorage.setItem('jwt', payload.data.token);
			localStorage.setItem('typeOfUser', payload.typeOfUser);
			return { ...state, isAuthenticated: true, errors: null };
		case SIGNUP_FAIL:
			localStorage.removeItem('jwt');
			localStorage.removeItem('typeOfUser');
			return {
				...state,
				isAuthenticated: false,
				user: null,
				errors: [...payload],
			};
		case AUTH_ERROR:
			localStorage.removeItem('jwt');
			localStorage.removeItem('typeOfUser');
			return { ...state, isAuthenticated: false, user: null };
		case CLEAR_ERRORS:
			return { ...state, errors: null };
		default:
			return state;
	}
};
