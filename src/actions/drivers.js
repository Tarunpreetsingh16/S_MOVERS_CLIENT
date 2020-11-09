import axios from 'axios';
import { GET_DRIVERS_FAIL, GET_DRIVERS_SUCCESS } from './types';

export const getDrivers = ({ location, date, carType }) => async (dispatch) => {
	const config = {
		headers: { 'Content-Type': 'application/json' },
	};
	const body = JSON.stringify({ location, date, carType });

	try {
		console.log(location, carType, date);
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
