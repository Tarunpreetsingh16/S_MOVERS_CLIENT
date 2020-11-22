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
	UPDATE_BOOKER_INFO_FAIL,
	UPDATE_BOOKER_INFO,
	UPDATE_PASSWORD,
	UPDATE_PASSWORD_FAIL,
	DELETE_ACCOUNT,
	DELETE_ACCOUNT_FAIL,
	CLEAR_DELETE_ERRORS,
	UPDATE_DRIVER_INFO_FAIL,
	UPDATE_DRIVER_INFO,
	UPDATE_HELPER_INFO,
	UPDATE_HELPER_INFO_FAIL,
	FORGOT_PASSWORD,
	FORGOT_PASSWORD_FAIL,
	CHANGE_PASSWORD,
	CHANGE_PASSWORD_FAIL,
} from './../actions/types';
const initialState = {
	token: localStorage.getItem('jwt'),
	user: null,
	isAuthenticated: false,
	errors: null,
	loginErrors: null,
	updateErrors: null,
	updatePasswordErrors: null,
	deleteErrors: null,
	forgotPasswordErrors: null,
	changePasswordErrors: null,
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
		case UPDATE_BOOKER_INFO:
		case UPDATE_DRIVER_INFO:
		case UPDATE_HELPER_INFO:
			return { ...state, updateErrors: null };
		case UPDATE_BOOKER_INFO_FAIL:
		case UPDATE_DRIVER_INFO_FAIL:
		case UPDATE_HELPER_INFO_FAIL:
			return { ...state, updateErrors: [...payload] };
		case UPDATE_PASSWORD:
			return { ...state, updatePasswordErrors: null };
		case UPDATE_PASSWORD_FAIL:
			return { ...state, updatePasswordErrors: [...payload] };
		case AUTH_ERROR:
		case LOGOUT_USER:
		case DELETE_ACCOUNT:
			localStorage.removeItem('jwt');
			localStorage.removeItem('typeOfUser');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				user: null,
				deleteErrors: null,
			};
		case DELETE_ACCOUNT_FAIL:
			return { ...state, deleteErrors: [...payload] };
		case CLEAR_DELETE_ERRORS:
			return { ...state, deleteErrors: null };
		case CLEAR_ERRORS:
			return { ...state, errors: null, loginErrors: null };
		case FORGOT_PASSWORD_FAIL:
			return { ...state, forgotPasswordErrors: [...payload] };
		case FORGOT_PASSWORD:
			return { ...state, forgotPasswordErrors: null };
		case CHANGE_PASSWORD:
			return { ...state, changePasswordErrors: null };
		case CHANGE_PASSWORD_FAIL:
			return { ...state, changePasswordErrors: [...payload] };
		default:
			return state;
	}
};
