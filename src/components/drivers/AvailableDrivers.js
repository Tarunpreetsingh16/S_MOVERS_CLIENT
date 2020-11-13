import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Card as DriverCard } from './../layout/DriverCard';

export const AvailableDrivers = ({ drivers }) => {
	const driversNested = drivers.drivers;
	/*Display the  available drivers to the user if there is any dirver fetched form the database*/
	const availableDrivers =
		driversNested != null &&
		driversNested.length > 0 &&
		driversNested.map((driver) => {
			if (driver !== undefined)
				/*If the driver is present then show it to the user by sending data to the Display Card */
				return <DriverCard key={driver[0]._id} dataFromParent={driver[0]} />;
		});

	if (!availableDrivers) {
		return (
			<Fragment>
				<div
					className='fontSize2_5'
					style={{ display: 'block', margin: '2rem auto' }}
				>
					No Driver available
				</div>
			</Fragment>
		);
	}
	return <Fragment>{availableDrivers}</Fragment>;
};
AvailableDrivers.propTypes = {};
/*Map state to props - Means map the state which we want to use in this component to props so we can pass 
it to the component as props and use the value of it to dynamically update the driver cards
*/
const mapStateToProps = (state) => ({ drivers: state.drivers });

/*We use connect() to connect any component that we want to use with redux
1st parameter is maptStateToProps which states the state values that we want to use in this component */
export default connect(mapStateToProps)(AvailableDrivers);
