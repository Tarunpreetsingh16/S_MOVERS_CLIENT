import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
//Redux
import { connect } from 'react-redux';
import { logout } from './../../actions/auth';
import PropTypes from 'prop-types';
//React router
import { Redirect } from 'react-router-dom';
export const NavBar = ({ isAuthenticated, logout }) => {
	const logoutAndRedirect = () => {
		logout();
	};
	/*Fields to show in the navbar when the user is not logged in */
	const notLoggedIn = (
		<ul className='flexDisplay alignItemsCenter fontSize2_5'>
			<Link
				to='/signUp'
				className='fontSize2_5'
				style={{ textDecoration: 'none' }}
			>
				<li className='colorWhite'>Sign Up</li>
			</Link>
			<Link
				to='/login'
				className='fontSize2_5'
				style={{ textDecoration: 'none' }}
			>
				<li className='btn btn-white colorBlack'>Login</li>
			</Link>
		</ul>
	);
	/*Fields to show in the navbar when the user is logged in */
	const loggedIn = (
		<ul className='flexDisplay alignItemsCenter fontSize2_5'>
			<Link to='*' className='fontSize2_5' style={{ textDecoration: 'none' }}>
				<li className='btn btn-white colorBlack'>Profile</li>
			</Link>
			<div className='fontSize2_5 pointer' style={{ textDecoration: 'none' }}>
				<li className='colorWhite' onClick={logoutAndRedirect}>
					Logout
				</li>
			</div>
		</ul>
	);
	return (
		<Fragment>
			{!isAuthenticated && <Redirect to='/' />}
			<section className='padding2 colorLightBlue flexDisplay justifySpaceBetween alignItemsCenter'>
				<Link to='/' className='fontSize2_5' style={{ textDecoration: 'none' }}>
					<h1 className='colorWhite'>S_MOVERS</h1>
				</Link>
				<div>{isAuthenticated ? loggedIn : notLoggedIn}</div>
			</section>
		</Fragment>
	);
};
/*Proptypes */
NavBar.propTypes = {
	logout: PropTypes.func.isRequired,
};
/*map state which we want to use with the props */
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});
export default withRouter(connect(mapStateToProps, { logout })(NavBar));
