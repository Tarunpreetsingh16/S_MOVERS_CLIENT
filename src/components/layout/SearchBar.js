import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { vehicleTypes } from './../../lib/vehicleTypes';
//Redux
import { getDrivers } from './../../actions/drivers';

export const SearchBar = ({ getDrivers }) => {
	const [location, setLocation] = useState();
	const [carType, setCarType] = useState();
	const [date, setDate] = useState();
	const [typeOfUser, setTypeOfUser] = useState('driver');

	useEffect(() => {
		let newLocation;
		if (location) newLocation = location.trim();
		else newLocation = null;
		getDrivers({ location: newLocation, carType, date });
	}, [location, carType, date, getDrivers]);

	let updateFilters = (e) => {
		switch (e.target.name) {
			case 'location':
				setLocation(e.target.value);
				break;
			case 'carType':
				setCarType(e.target.value);
				break;
			case 'date':
				setDate(e.target.value);
				break;
			case 'typeOfUser':
				setTypeOfUser(e.target.value);
				break;
			default:
				return;
		}
	};
	return (
		<Fragment>
			<section className='flexDisplay justifyCenter flexWrap alignItemsCenter'>
				<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
					<label htmlFor='location' className='fontWeight500 padding1'>
						Location
					</label>
					<input
						type='text'
						name='location'
						id='location'
						className='padding1'
						onChange={updateFilters}
					></input>
				</div>
				<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
					<label htmlFor='carType' className='fontWeight500 padding1'>
						Car Type
					</label>
					<select
						name='carType'
						id='carType'
						className='padding1'
						onChange={updateFilters}
					>
						{vehicleTypes.map((vehicleType) => (
							<option
								key={vehicleType.value}
								value={vehicleType.value}
								className='fontSize1_5'
							>
								{vehicleType.label}
							</option>
						))}
					</select>
				</div>
				<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
					<label htmlFor='date' className='fontWeight500 padding1'>
						Date
					</label>
					<input
						type='date'
						name='date'
						id='date'
						className='padding1'
						onChange={updateFilters}
					></input>
				</div>
				<div className='fieldSet fontSize2_5 padding2'>
					<input
						type='radio'
						name='typeOfUser'
						id='typeOfUser'
						className='padding1'
						value='driver'
						defaultChecked
						onChange={updateFilters}
					></input>
					<label htmlFor='driver' className='fontWeight500 padding1'>
						Driver
					</label>
					<input
						type='radio'
						name='typeOfUser'
						id='typeOfUser'
						className='padding1'
						value='helper'
						onChange={updateFilters}
					></input>
					<label htmlFor='helper' className='fontWeight500 padding1'>
						Helper
					</label>
				</div>
			</section>
			<h4
				className='fontSize1_5'
				style={{ display: 'inline-block', margin: '2rem auto' }}
			>
				Available {typeOfUser}s
			</h4>
		</Fragment>
	);
};
/*Proptypes is used to do the type checking as the application will get bigger it will be 
a good option to check the type of the props that we are gonna use in the components */
SearchBar.propTypes = {
	getDrivers: PropTypes.func.isRequired,
};
/*connect to connect this component to redux and pass null as first parameter as we do not want any state updates 
second parameter is use to dispatch an action */
export default connect(null, { getDrivers })(SearchBar);
