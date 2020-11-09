import { GET_DRIVERS_SUCCESS, GET_DRIVERS_FAIL } from './../actions/types';
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
		default:
			return state;
	}
};
