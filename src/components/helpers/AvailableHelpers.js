import React, { Fragment, useEffect } from 'react';
import { Card as DriverCard } from '../layout/Card';
//Redux
import { connect } from 'react-redux';
export const AvailableHelpers = ({ helpers }) => {
	let helpersNested = helpers.helpers;

	/*Display the  available helpers to the user if there is any dirver fetched form the database*/
	const availableHelpers =
		helpersNested != null &&
		helpersNested.length > 0 &&
		helpersNested.map((helper, index) => {
			if (helper !== undefined)
				/*If the helper is present then show it to the user by sending data to the Display Card */
				return (
					<DriverCard
						key={helper[0]._id}
						dataFromParent={helper[0]}
						index={index}
					/>
				);
		});

	if (!availableHelpers) {
		return (
			<Fragment>
				<div
					className='fontSize2_5'
					style={{ display: 'block', margin: '2rem auto' }}
				>
					No Helper available
				</div>
			</Fragment>
		);
	}
	return <Fragment>{availableHelpers}</Fragment>;
};
AvailableHelpers.propTypes = {};
/*Map state to props - Means map the state which we want to use in this component to props so we can pass 
it to the component as props and use the value of it to dynamically update the driver cards
*/
const mapStateToProps = (state) => ({ helpers: state.helpers });

/*We use connect() to connect any component that we want to use with redux
1st parameter is maptStateToProps which states the state values that we want to use in this component */
export default connect(mapStateToProps)(AvailableHelpers);
