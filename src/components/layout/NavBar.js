import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { Link, withRouter } from 'react-router-dom';
//Redux
import { connect } from 'react-redux';
import { logout } from './../../actions/auth';
import PropTypes from 'prop-types';
//React router
import { Redirect } from 'react-router-dom';
export const NavBar = ({ isAuthenticated, logout, user }) => {
	const userName = useMemo(() => {
		if (isAuthenticated && user) {
			return user.name;
		}
	}, [isAuthenticated, user]);
	const logoutAndRedirect = () => {
		logout();
	};
	/*Fields to show in the navbar when the user is not logged in */
	const notLoggedIn = (
		<ul className='flexDisplay alignItemsCenter fontSize2_5'>
			<Link
				to='/signUp'
				className='fontSize2_5 navBarLinks '
				style={{ textDecoration: 'none' }}
			>
				<li className='colorWhite fillColor'>Sign Up</li>
			</Link>
			<Link
				to='/login'
				className='fontSize2_5 navBarLinks'
				style={{ textDecoration: 'none' }}
			>
				<li className='btn btn-white colorBlack'>Login</li>
			</Link>
		</ul>
	);
	const profileLinkTo = `/${localStorage.getItem('typeOfUser')}/profile`;
	/*Fields to show in the navbar when the user is logged in */
	const loggedIn = (
		<ul className='flexDisplay alignItemsCenter fontSize2_5'>
			<div
				id='userName'
				className='fontSize2_5 navBarLinks'
				style={{ textDecoration: 'none' }}
			>
				<li className='colorWhite'>
					Welcome <em className='fontSize1_5'>{userName}</em>
				</li>
			</div>
			<Link
				to={profileLinkTo}
				className='fontSize2_5 colorWhite navBarLinks fillColor'
				style={{ textDecoration: 'none' }}
			>
				<li className=''>Profile</li>
			</Link>
			<Link
				to='/bookings'
				className='fontSize2_5 colorWhite navBarLinks fillColor'
				style={{ textDecoration: 'none' }}
			>
				<li className=''>Bookings</li>
			</Link>
			<div
				className='fontSize2_5 pointer navBarLinks'
				style={{ textDecoration: 'none' }}
			>
				<li className='btn btn-white colorBlack' onClick={logoutAndRedirect}>
					Logout
				</li>
			</div>
		</ul>
	);
	return (
		<Fragment>
			<section className='padding2 colorLightBlue flexDisplay justifySpaceBetween alignItemsCenter'>
				<Link to='/' className='fontSize2_5' style={{ textDecoration: 'none' }}>
					<h1 className='colorWhite navBarLinks'>S_MOVERS</h1>
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
	user: state.auth.user,
});
export default withRouter(connect(mapStateToProps, { logout })(NavBar));
