import React, { Fragment } from 'react';
import SearchBar from './SearchBar';
import PropTypes from 'prop-types';
import AvailableDrivers from './../drivers/AvailableDrivers';
//Redux
import { connect } from 'react-redux';
import { clearErrors } from './../../actions/auth';
export const Landing = ({ clearErrors }) => {
	clearErrors();
	return (
		<Fragment>
			<div className='flexDisplayColumn'>
				<SearchBar />
				<AvailableDrivers />
			</div>
		</Fragment>
	);
};

Landing.propTypes = {
	clearErrors: PropTypes.func.isRequired,
};
/*We use connect() to connect any component that we want to use with redux
1st parameter is maptStateToProps which states the state values that we want to use in this component */
export default connect(null, { clearErrors })(Landing);
