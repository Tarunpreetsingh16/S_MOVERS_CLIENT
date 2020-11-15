import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
//Redux
import { connect } from 'react-redux';
import { clearErrors } from './../../actions/auth';
export const Login = () => {
	return (
		<Fragment>
			<form className='flexDisplayColumn'>
				<div className='fontSize2_5 padding1'>Login</div>
				<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
					<label htmlFor='email' className='fontWeight500 padding1'>
						Email
					</label>
					<input
						type='email'
						name='email'
						id='email'
						className='padding1'
						required
					></input>
					<h5 className='fontSize1_5 fontWeight400 colorDanger displayNone margin1_0'></h5>
				</div>
				<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
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
				<div className='fieldSet fontSize2_5 padding2'>
					<label className='fontWeight500 padding1 displayBlock'>
						Type of Account
					</label>
					<input
						type='radio'
						name='typeOfUser'
						className='padding1'
						value='booker'
						defaultChecked
					></input>
					<label htmlFor='booker' className='fontWeight500 padding1'>
						Booker
					</label>
					<input
						type='radio'
						name='typeOfUser'
						className='padding1'
						value='driver'
					></input>
					<label htmlFor='driver' className='fontWeight500 padding1'>
						Driver
					</label>
					<input
						type='radio'
						name='typeOfUser'
						className='padding1'
						value='helper'
					></input>
					<label htmlFor='helper' className='fontWeight500 padding1'>
						Helper
					</label>
				</div>
				<div className='padding2'>
					<input
						type='submit'
						className='btn padding2 fontSize1_5 btn-theme width50'
						value='Submit'
					></input>
				</div>
			</form>
		</Fragment>
	);
};

Login.propTypes = {
	clearErrors: PropTypes.func.isRequired,
};
/*We use connect() to connect any component that we want to use with redux
1st parameter is maptStateToProps which states the state values that we want to use in this component */
export default connect(null, { clearErrors })(Login);
