import React from 'react';

export const Loader = () => {
	return (
		<div
			className=' flexDisplay justifyCenter alignItemsCenter'
			id='spinnerContainer'
		>
			<div
				id='spinner'
				className=' flexDisplay justifyCenter alignItemsCenter fontSize1_5 padding1 colorWhite'
			>
				Loading
			</div>
		</div>
	);
};
export default Loader;
