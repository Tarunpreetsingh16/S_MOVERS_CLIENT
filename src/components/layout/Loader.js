import React from 'react';

export const Loader = ({ msg }) => {
	return (
		<div
			className=' flexDisplayColumn justifyCenter alignItemsCenter'
			id='spinnerContainer'
		>
			<div id='spinner' className='padding1 '></div>
			<div className='padding2 fontSize1_5 colorWhite'>{msg}</div>
		</div>
	);
};
export default Loader;
