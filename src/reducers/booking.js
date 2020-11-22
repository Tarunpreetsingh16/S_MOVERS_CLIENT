import {
	PROVIDE_AVAILABILITY_FAIL,
	PROVIDE_AVAILABILITY,
	GET_AVAILABILTIY_FAIL,
	GET_AVAILABILTIY,
} from './../actions/types';
const initialState = {
	availability: [],
	dateUpdated: null,
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
		case PROVIDE_AVAILABILITY:
		case PROVIDE_AVAILABILITY_FAIL:
		default:
			return state;
	}
};
