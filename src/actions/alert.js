import { SET_MESSAGE, REMOVE_MESSAGE } from './types';
import { v4 as uuid } from 'uuid';

export const setAlert = (msg, alertType) => (dispatch) => {
	const id = uuid();
	dispatch({
		type: SET_MESSAGE,
		payload: { msg, alertType, id },
	});
};
