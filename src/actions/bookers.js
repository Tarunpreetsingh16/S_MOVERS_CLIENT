import axios from 'axios';
import { GET_BOOKINGS } from './types';
import setAuthToken from '../lib/setAuthToken';
/*Action - getBookings - To fetch the bookigns from database based on the user logged in
 */
export const getPreviousBookings = () => async (dispatch) => {
	if (localStorage.jwt && localStorage.typeOfUser) {
		setAuthToken(localStorage.jwt);
	}
	try {
		const config = {
			header: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.get('api/bookers/bookings', null, config);
		dispatch({
			type: GET_BOOKINGS,
			payload: res.data,
		});
	} catch (err) {}
};
