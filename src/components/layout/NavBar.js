import React, { Fragment } from 'react';

export const NavBar = () => {
	return (
		<Fragment>
			<section className='padding2 colorLightBlue flexDisplay justifySpaceBetween alignItemsCenter'>
				<h1 className='colorWhite'>S_MOVERS</h1>
				<div>
					<ul className='flexDisplay alignItemsCenter fontSize2_5'>
						<li className='pointer'>Sign Up</li>
						<li className='btn btn-white'>Login</li>
					</ul>
				</div>
			</section>
		</Fragment>
	);
};
export default NavBar;
