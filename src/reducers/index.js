import { combineReducers } from 'redux';
import alert from './alert';
import drivers from './drivers';
export default combineReducers({
	alert,
	drivers,
});
