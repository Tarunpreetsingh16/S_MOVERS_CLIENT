import { combineReducers } from 'redux';
import alert from './alert';
import drivers from './drivers';
import auth from './auth';
export default combineReducers({
	alert,
	drivers,
	auth,
});
