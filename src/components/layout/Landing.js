import React, { Fragment } from 'react';
import SearchBar from './SearchBar';
import AvailableDrivers from './../drivers/AvailableDrivers';
//Redux
export const Landing = () => {
	return (
		<Fragment>
			<div className='flexDisplayColumn'>
				<SearchBar />
				<AvailableDrivers />
			</div>
		</Fragment>
	);
};

/*We use connect() to connect any component that we want to use with redux
1st parameter is maptStateToProps which states the state values that we want to use in this component */
export default Landing;
