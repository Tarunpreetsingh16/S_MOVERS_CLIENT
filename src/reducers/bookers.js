import { GET_BOOKINGS } from './../actions/types';
const initialState = {
	previousBookings: null,
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_BOOKINGS:
			return { ...state, previousBookings: payload };
		default:
			return state;
	}
};
