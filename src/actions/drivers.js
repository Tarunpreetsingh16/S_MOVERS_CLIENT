import axios from 'axios';
import { GET_DRIVERS_FAIL, GET_DRIVERS_SUCCESS } from './types';
/*Action - GetDrivers - To fetch the drivers from database based on the data passed to it
	Location, Date, Car Type
 */
export const getDrivers = ({ location, date, carType }) => async (dispatch) => {
	try {
		const res = await axios.get('api/bookers/searchDrivers', {
			params: {
				location,
				date,
				carType,
			},
		});
		dispatch({
			type: GET_DRIVERS_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: GET_DRIVERS_FAIL,
		});
	}
};
