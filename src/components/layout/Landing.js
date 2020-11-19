import React, { Fragment, useState } from 'react';
import SearchBar from './SearchBar';
import AvailableDrivers from './../drivers/AvailableDrivers';
import AvailableHelpers from './../helpers/AvailableHelpers';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//Redux
export const Landing = ({ isAuthenticated }) => {
	const [typeOfUser, setTypeOfUser] = useState('driver');
	const changeTypeOfUser = (value) => {
		setTypeOfUser(value);
	};
	return isAuthenticated && localStorage.typeOfUser === 'driver' ? (
		<Redirect to='/driver/profile' />
	) : isAuthenticated && localStorage.typeOfUser === 'helper' ? (
		<Redirect to='/helper/profile' />
	) : (
		<Fragment>
			<div className='flexDisplayColumn'>
				<SearchBar changeTypeOfUser={changeTypeOfUser} />
				{typeOfUser === 'driver' ? <AvailableDrivers /> : <AvailableHelpers />}
			</div>
		</Fragment>
	);
};

/*We use connect() to connect any component that we want to use with redux
1st parameter is maptStateToProps which states the state values that we want to use in this component */
const maptStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(maptStateToProps)(Landing);
