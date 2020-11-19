import { GET_HELPERS_FAIL, GET_HELPERS_SUCCESS } from './../actions/types';
const initialState = {
	helpers: null,
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_HELPERS_SUCCESS:
			return { ...state, helpers: payload };
		case GET_HELPERS_FAIL:
			return { ...state, helpers: null };
		default:
			return state;
	}
};
