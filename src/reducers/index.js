import { combineReducers } from 'redux';
import alert from './alert';
import drivers from './drivers';
import helpers from './helpers';
import auth from './auth';
import bookers from './bookers';
import booking from './booking';
export default combineReducers({
	alert,
	drivers,
	auth,
	helpers,
	bookers,
	booking,
});
