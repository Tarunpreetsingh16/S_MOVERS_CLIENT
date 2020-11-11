import React, { Fragment, useEffect } from 'react';
import SearchBar from './SearchBar';
import AvailableDrivers from './../drivers/AvailableDrivers';

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
export default Landing;
