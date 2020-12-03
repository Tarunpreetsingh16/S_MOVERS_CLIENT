import {
	PROVIDE_AVAILABILITY_FAIL,
	PROVIDE_AVAILABILITY,
	GET_AVAILABILTIY_FAIL,
	GET_AVAILABILTIY,
	SEND_BOOKING_PROPOSAL,
	SEND_BOOKING_PROPOSAL_FAIL,
	BOOKING_RESPONSE_FAIL,
	BOOKING_RESPONSE,
	VIEW_UPCOMING_BOOKINGS,
} from './../actions/types';
const initialState = {
	availability: [],
	dateUpdated: null,
	errors: null,
	responseErrors: null,
	bookings: null,
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_AVAILABILTIY:
			return {
				...state,
				availability: payload.availability,
				dateUpdated: payload.dateUpdated,
			};
		case GET_AVAILABILTIY_FAIL:
			return { ...state, availability: [], dateUpdated: null };
		case SEND_BOOKING_PROPOSAL_FAIL:
			return { ...state, errors: [...payload] };
		case SEND_BOOKING_PROPOSAL:
			return { ...state, errors: null };
		case PROVIDE_AVAILABILITY:
		case PROVIDE_AVAILABILITY_FAIL:
		case BOOKING_RESPONSE_FAIL:
			return { ...state, responseErrors: [...payload] };
		case BOOKING_RESPONSE:
			return { ...state, responseErrors: null };
		case VIEW_UPCOMING_BOOKINGS:
			return { ...state, bookings: payload };
		default:
			return state;
	}
};
