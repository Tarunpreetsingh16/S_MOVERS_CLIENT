import React, { Fragment, useState } from 'react';

import { cities } from './../../lib/servicableAreas';
import { vehicleTypes } from './../../lib/vehicleTypes';

export const SignUp = () => {
	const [typeOfUser, setTypeOfUser] = useState('booker');
	/*method to update the state of typeOfUser to show the sign up form accordingly */
	const updateTypeOfuser = (e) => {
		setTypeOfUser(e.target.value);
	};
	/*Fields that shoule be displayed for the driver */
	const carType = (
		<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
			<label htmlFor='carType' className='fontWeight500 padding1'>
				Car Type
			</label>
			<select name='carType' id='carType' className='padding1'>
				{vehicleTypes.map((vehicleType) => (
					<option
						key={vehicleType.value}
						value={vehicleType.value}
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
			<label htmlFor='experience' className='fontWeight500 padding1'>
				Driving Experience
			</label>
			<input
				type='number'
				name='experience'
				id='experience'
				className='padding1'
				required
			></input>
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
				<select name='location' id='location' className='padding1'>
					{cities.map((city) => {
						return (
							<option
								key={city.value}
								value={city.value}
								className='fontSize1_5'
								disabled={city.disabled}
							>
								{city.label}
							</option>
						);
					})}
				</select>
			</div>
			{/*Car Type */ typeOfUser == 'driver' && carType}
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
				></input>
			</div>

			{/*Driving experience*/ typeOfUser == 'driver' && drivingExp}
		</div>
	);
	const commonFields = (
		<form className='flexDisplayColumn'>
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
					required
				></input>
			</div>
			<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
				<label htmlFor='name' className='fontWeight500 padding1'>
					Name
				</label>
				<input
					type='text'
					name='name'
					id='name'
					className='padding1'
					required
				></input>
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
			</div>
			<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
				<label htmlFor='name' className='fontWeight500 padding1'>
					Confirm Password
				</label>
				<input
					type='password'
					name='confirmPassword'
					id='confirmPassword'
					className='padding1'
					required
				></input>
			</div>
			{
				/*Conditional display fo the sign up fields based on the type of user
			selected*/
				(typeOfUser == 'helper' || typeOfUser == 'driver') && driverHelperCommon
			}
			<div className='fieldSet fontSize2_5 padding2'>
				<input
					type='radio'
					name='typeOfUser'
					className='padding1'
					value='booker'
					onClick={updateTypeOfuser}
					defaultChecked
				></input>
				<label htmlFor='booker' className='fontWeight500 padding1'>
					Booker
				</label>
				<input
					type='radio'
					name='typeOfUser'
					className='padding1'
					onClick={updateTypeOfuser}
					value='driver'
				></input>
				<label htmlFor='driver' className='fontWeight500 padding1'>
					Driver
				</label>
				<input
					type='radio'
					name='typeOfUser'
					className='padding1'
					onClick={updateTypeOfuser}
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
				></input>
			</div>
		</form>
	);
	return <Fragment>{commonFields}</Fragment>;
};
export default SignUp;
