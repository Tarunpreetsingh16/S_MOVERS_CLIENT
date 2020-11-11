import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import SignUp from '../auth/SignUp';
export const NavBar = () => {
	return (
		<Router>
			<Fragment>
				<section className='padding2 colorLightBlue flexDisplay justifySpaceBetween alignItemsCenter'>
					<Link to='/'>
						<h1 className='colorWhite'>S_MOVERS</h1>
					</Link>
					<div>
						<ul className='flexDisplay alignItemsCenter fontSize2_5'>
							<Link to='/signUp'>
								<li className='pointer'>Sign Up</li>
							</Link>
							<Link to='/login'>
								<li className='btn btn-white'>Login</li>
							</Link>
						</ul>
					</div>
				</section>
			</Fragment>
		</Router>
	);
};
export default NavBar;
