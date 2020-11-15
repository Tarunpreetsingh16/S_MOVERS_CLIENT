/*Reducer - Auth - Contains reducer for Authorization actions */
import {
	SIGNUP_FAIL,
	SIGNUP_SUCCESS,
	CLEAR_ERRORS,
	LOAD_USER,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_USER,
} from './../actions/types';
const initialState = {
	token: localStorage.getItem('jwt'),
	user: null,
	isAuthenticated: false,
	errors: null,
	loginErrors: null,
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
		case LOGIN_SUCCESS:
			localStorage.setItem('jwt', payload.data.token);
			localStorage.setItem('typeOfUser', payload.typeOfUser);
			return { ...state, isAuthenticated: true, loginErrors: null };
		case SIGNUP_FAIL:
			localStorage.removeItem('jwt');
			localStorage.removeItem('typeOfUser');
			return {
				...state,
				isAuthenticated: false,
				user: null,
				token: null,
				errors: [...payload],
			};
		case LOGIN_FAIL:
			localStorage.removeItem('jwt');
			localStorage.removeItem('typeOfUser');
			return {
				...state,
				isAuthenticated: false,
				user: null,
				token: null,
				loginErrors: [...payload],
			};
		case AUTH_ERROR:
		case LOGOUT_USER:
			localStorage.removeItem('jwt');
			localStorage.removeItem('typeOfUser');
			return { ...state, token: null, isAuthenticated: false, user: null };

		case CLEAR_ERRORS:
			return { ...state, errors: null, loginErrors: null };
		default:
			return state;
	}
};
