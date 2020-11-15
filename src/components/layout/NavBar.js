import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
//Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
export const NavBar = ({ isAuthenticated }) => {
	return (
		<Fragment>
			<section className='padding2 colorLightBlue flexDisplay justifySpaceBetween alignItemsCenter'>
				<Link to='/' className='fontSize2_5' style={{ textDecoration: 'none' }}>
					<h1 className='colorWhite'>S_MOVERS</h1>
				</Link>
				<div>
					{!isAuthenticated && (
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
					)}
				</div>
			</section>
		</Fragment>
	);
};
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(NavBar);
