import React, {Fragment}from 'react';
import { connect } from 'react-redux';
import { setAlert } from './../../actions/alert';
import PropTypes from 'prop-types';

export const AvailableDrivers = ({ setAlert, drivers }) =>{ 
	const driversNested = drivers.drivers;
	return driversNested != null && driversNested.length > 0 && driversNested.map((driver)=>{
		return <p key={driver[0]._id}>{driver[0].email}</p>
	});
}
AvailableDrivers.propTypes = {
	
};
const mapStateToProps = (state) => ({ drivers: state.drivers });
export default connect(mapStateToProps)(
	AvailableDrivers
);
