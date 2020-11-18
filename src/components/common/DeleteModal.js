import React, { Fragment } from 'react';

export const DeleteModal = ({ cancelModal }) => {
	const cancel = () => {
		cancelModal();
	};
	return (
		<Fragment>
			<section id='modalBox' className=' flexDisplay alignItemsCenter'>
				<div
					id='modalHolder'
					className='flexDisplayColumn justifyCenter alignItemCenter center padding2'
				>
					<h2 className='fontSize1_5 padding1'>Confirm Password</h2>
					<div className='fieldSet flexDisplayColumn fontSize2_5 padding1'>
						<label htmlFor='password' className='fontWeight500 padding1'>
							Password
						</label>
						<input
							type='password'
							name='password'
							id='password'
							className='padding1'
							required
						></input>
						<h5 className='fontSize1_5 fontWeight400 colorDanger displayNone margin1_0'></h5>
					</div>
					<div className='flexDisplay'>
						<div className='padding2 '>
							<input
								type='submit'
								className='btn padding1 fontSize1_5 btn-danger'
								value='Delete'
							></input>
						</div>
						<div className='padding2'>
							<input
								type='submit'
								className='btn padding1 fontSize1_5 btn-theme'
								value='Cancel'
								onClick={cancel}
							></input>
						</div>
					</div>
				</div>
			</section>
		</Fragment>
	);
};

export default DeleteModal;
