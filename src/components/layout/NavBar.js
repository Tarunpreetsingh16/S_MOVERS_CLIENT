import React, { Fragment } from 'react';

export const NavBar = () => {
	return (
		<Fragment>
			<section className=' colorLightBlue container flexDisplay justifySpaceBetween alignItemsCenter'>
				<h1 className='colorWhite'>S_MOVERS</h1>
				<div>
					<ul className='flexDisplay alignItemsCenter'>
						<li className='pointer'>Sign Up</li>
						<li className='btn btn-success'>Login</li>
					</ul>
				</div>
			</section>
		</Fragment>
	);
};
export default NavBar;
