import React, { Fragment } from 'react';
//Redux
import { connect } from 'react-redux';
export const Alert = ({ alerts }) => {
	return (
		alerts != null &&
		alerts.length > 0 &&
		alerts.map((alert) => {
			return <div key={alert.id}>{alert.msg}</div>;
		})
	);
};

/*mapStateToProps - Get the state which needs to be used in this component */
const mapStateToProps = (state) => ({
	alerts: state.alert,
});
export default connect(mapStateToProps)(Alert);
