/*Action - Alert -  Contains actions related to alerts which will be displayed to the user based on the scenario */
import { SET_MESSAGE, REMOVE_MESSAGE } from './types';
import { v4 as uuid } from 'uuid';

export const setAlert = (msg, alertType, timeOut) => (dispatch) => {
	const id = uuid();
	/*Dispatch - SET_MESSAGE action with the required payload */
	dispatch({
		type: SET_MESSAGE,
		payload: { msg, alertType, id },
	});
	/*Dispatch - REMOVE_MESSAGE action with the required payload after sometime */
	setTimeout(() => {
		dispatch({
			type: REMOVE_MESSAGE,
			payload: id,
		});
	}, timeOut);
};
