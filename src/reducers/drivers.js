import {
	GET_DRIVERS_SUCCESS,
	GET_DRIVERS_FAIL,
	PROVIDE_AVAILABILITY_FAIL,
	PROVIDE_AVAILABILITY,
} from './../actions/types';
const initialState = {
	drivers: null,
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_DRIVERS_SUCCESS:
			return { ...state, drivers: payload };
		case GET_DRIVERS_FAIL:
			return { ...state, drivers: null };
		case PROVIDE_AVAILABILITY:
		case PROVIDE_AVAILABILITY_FAIL:
		default:
			return state;
	}
};
