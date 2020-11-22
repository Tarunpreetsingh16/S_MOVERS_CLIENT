import React, { Fragment, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { cities } from './../../lib/servicableAreas';
import { vehicleTypes } from './../../lib/vehicleTypes';
import { signUp, loadUser } from './../../actions/auth';
import Loader from './../layout/Loader';
//Redux
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
export const SignUp = ({ signUp, errors, loadUser, isAuthenticated }) => {
	const [loading, setLoading] = useState(true);
	/*State to store the form data which is updated on data change  */
	const [formData, setFormData] = useState({
		typeOfUser: 'booker',
		email: '',
		name: '',
		password: '',
		confirmPassword: '',
		location: 'toronto',
		carType: 'suv',
		rate: '',
		drivingExperience: '',
		licenseIssuedDate: Date.now(),
	});
	/*State to store the errors which are updated on form submission  */
	const [messages, setMessages] = useState({
		email: '',
		name: '',
		password: '',
		confirmPassword: '',
		rate: '',
		drivingExperience: '',
	});
	const messagesHack = {
		email: '',
		name: '',
		password: '',
		confirmPassword: '',
		rate: '',
		drivingExperience: '',
	};

	useEffect(() => {
		if (errors) {
			errors.map((error) => {
				if (document.getElementById(error.param)) {
					const messageBox = document.getElementById(error.param).nextSibling;
					messagesHack[error.param] = error.msg;
					messageBox.classList.add('displayBlock');
					messageBox.classList.remove('displayNone');
					messageBox.classList.add('padding0_5');
				}
			});
		}

		if (isAuthenticated) {
			document.getElementById('form').disabled = true;
			setTimeout(() => setLoading(false), 4000);
		}
		setMessages(messagesHack);
	}, [errors, isAuthenticated]);

	const hideErrors = () => {
		const messageBoxes = document.querySelectorAll('h5');
		let i = 0;
		for (; i < messageBoxes.length; i++) {
			messageBoxes[i].classList.remove('displayBlock');
			messageBoxes[i].classList.add('displayNone');
			messageBoxes[i].classList.remove('padding0_5');
		}
	};
	/*method to update the state of typeOfUser to show the sign up form accordingly */
	const updateData = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const submitForm = (e) => {
		e.preventDefault();
		hideErrors();
		//call the signup action by sending form data
		signUp(formData).then(() => {
			loadUser();
		});
	};
	/*Fields that shoule be displayed for the driver */
	const carType = (
		<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
			<label htmlFor='carType' className='fontWeight500 padding1'>
				Car Type
			</label>
			<select
				name='carType'
				id='carType'
				className='padding1'
				value={formData.carType}
				onChange={updateData}
			>
				{vehicleTypes.map((vehicleType) => (
					<option
						key={vehicleType.value}
						value={vehicleType.value}
						name='carType'
						className='fontSize1_5'
						disabled={vehicleType.disabled}
					>
						{vehicleType.label}
					</option>
				))}
			</select>
		</div>
	);
	const drivingExp = (
		<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
			<label htmlFor='drivingExperience' className='fontWeight500 padding1'>
				Driving Experience
			</label>
			<input
				type='number'
				name='drivingExperience'
				id='drivingExperience'
				className='padding1'
				onChange={updateData}
				min='1'
				required
			></input>
			<h5 className='fontSize1_5 fontWeight400 colorDanger displayNone margin1_0'>
				{messages.drivingExperience}
			</h5>
		</div>
	);
	/*Fields that should be displayed for the helper */
	const driverHelperCommon = (
		<div>
			{/*Location */}
			<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
				<label htmlFor='location' className='fontWeight500 padding1'>
					Location
				</label>
				<select
					name='location'
					id='location'
					className='padding1'
					value={formData.location}
					onChange={updateData}
				>
					{cities.map((city) => {
						return (
							<option
								key={city.value}
								value={city.value}
								className='fontSize1_5'
								disabled={city.disabled}
								name='location'
							>
								{city.label}
							</option>
						);
					})}
				</select>
			</div>
			{/*Car Type */ formData.typeOfUser === 'driver' && carType}
			{/*Rate*/}
			<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
				<label htmlFor='rate' className='fontWeight500 padding1'>
					Rate
				</label>
				<input
					type='number'
					name='rate'
					id='rate'
					className='padding1'
					required
					placeholder='20/hr'
					min='15'
					onChange={updateData}
				></input>
				<h5 className='fontSize1_5 fontWeight400 colorDanger displayNone margin1_0'>
					{messages.rate}
				</h5>
			</div>

			{/*Driving experience*/ formData.typeOfUser === 'driver' && drivingExp}
		</div>
	);
	const commonFields = (
		<form className='flexDisplayColumn' id='form'>
			<div className='fontSize2_5 padding1'>Sign Up</div>
			<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
				<label htmlFor='email' className='fontWeight500 padding1'>
					Email
				</label>
				<input
					type='email'
					name='email'
					id='email'
					className='padding1'
					onChange={updateData}
					required
				></input>
				<h5 className='fontSize1_5 fontWeight400 colorDanger displayNone margin1_0'>
					{messages.email}
				</h5>
			</div>
			<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
				<label htmlFor='name' className='fontWeight500 padding1'>
					Name
				</label>
				<input
					type='text'
					name='name'
					id='name'
					onChange={updateData}
					className='padding1'
					required
				></input>
				<h5 className='fontSize1_5 fontWeight400 colorDanger displayNone margin1_0'>
					{messages.name}
				</h5>
			</div>
			<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
				<label htmlFor='password' className='fontWeight500 padding1'>
					Password
				</label>
				<input
					type='password'
					name='password'
					id='password'
					onChange={updateData}
					className='padding1'
					required
				></input>
				<h5 className='fontSize1_5 fontWeight400 colorDanger displayNone margin1_0'>
					{messages.password}
				</h5>
			</div>
			<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
				<label htmlFor='confirmPassword' className='fontWeight500 padding1'>
					Confirm Password
				</label>
				<input
					type='password'
					name='confirmPassword'
					id='confirmPassword'
					className='padding1'
					onChange={updateData}
					required
				></input>
				<h5 className='fontSize1_5 fontWeight400 colorDanger displayNone margin1_0'>
					{messages.confirmPassword}
				</h5>
			</div>
			{
				/*Conditional display fo the sign up fields based on the type of user
			selected*/
				(formData.typeOfUser === 'helper' ||
					formData.typeOfUser === 'driver') &&
					driverHelperCommon
			}
			<div className='fieldSet fontSize2_5 padding2'>
				<label className='fontWeight500 padding1 displayBlock'>
					Type of Account
				</label>
				<input
					type='radio'
					name='typeOfUser'
					className='padding1'
					value='booker'
					onChange={updateData}
					defaultChecked
				></input>
				<label htmlFor='booker' className='fontWeight500 padding1'>
					Booker
				</label>
				<input
					type='radio'
					name='typeOfUser'
					className='padding1'
					onChange={updateData}
					value='driver'
				></input>
				<label htmlFor='driver' className='fontWeight500 padding1'>
					Driver
				</label>
				<input
					type='radio'
					name='typeOfUser'
					className='padding1'
					onChange={updateData}
					value='helper'
				></input>
				<label htmlFor='helper' className='fontWeight500 padding1'>
					Helper
				</label>
			</div>
			<div className='padding2'>
				<input
					type='submit'
					onClick={submitForm}
					className='btn padding2 fontSize1_5 btn-theme width50'
					value='Submit'
				></input>
			</div>
		</form>
	);
	return (
		<Fragment>
			{isAuthenticated && <Loader msg='Loading' />}
			{
				/*Check  if the user has been loaded into the system*/
				isAuthenticated && !loading && <Redirect to='/' />
			}
			{commonFields}
		</Fragment>
	);
};
SignUp.propTypes = {
	loadUser: PropTypes.func.isRequired,
	signUp: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	errors: state.auth.errors,
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { signUp, loadUser })(SignUp);
