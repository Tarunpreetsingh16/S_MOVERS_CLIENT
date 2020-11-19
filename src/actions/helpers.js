import axios from 'axios';
import { GET_HELPERS_FAIL, GET_HELPERS_SUCCESS } from './types';
/*Action - getHelpers - To fetch the helpers from database based on the data passed to it
	Location, Date
 */
export const getHelpers = ({ location, date }) => async (dispatch) => {
	try {
		const res = await axios.get('api/bookers/searchHelpers', {
			params: {
				location,
				date,
			},
		});
		console.log(123);
		dispatch({
			type: GET_HELPERS_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: GET_HELPERS_FAIL,
		});
	}
};
