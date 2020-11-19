import { combineReducers } from 'redux';
import alert from './alert';
import drivers from './drivers';
import helpers from './helpers';
import auth from './auth';
import bookers from './bookers';
export default combineReducers({
	alert,
	drivers,
	auth,
	helpers,
	bookers,
});
