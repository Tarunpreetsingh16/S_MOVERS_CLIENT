import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { vehicleTypes } from './../../lib/vehicleTypes';
//Redux
import { getDrivers } from './../../actions/drivers';
import { getHelpers } from './../../actions/helpers';

export const SearchBar = ({ getDrivers, getHelpers, changeTypeOfUser }) => {
	const [location, setLocation] = useState();
	const [carType, setCarType] = useState();
	const [date, setDate] = useState();
	const [typeOfUser, setTypeOfUser] = useState('driver');

	useEffect(() => {
		let newLocation;
		if (location) newLocation = location.trim();
		else newLocation = null;
		if (typeOfUser === 'driver')
			getDrivers({ location: newLocation, carType, date });
		else if (typeOfUser === 'helper') {
			getHelpers({ location: newLocation, date });
		}
	}, [location, carType, date, getDrivers, typeOfUser]);

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
				//disable the car type for helper
				if (e.target.value === 'helper') {
					document.getElementById('carType').disabled = true;
				} //enable the car type for helper
				else if (e.target.value === 'driver') {
					document.getElementById('carType').disabled = false;
				}
				changeTypeOfUser(e.target.value);
				setTypeOfUser(e.target.value);
				break;
			default:
				return;
		}
	};
	return (
		<Fragment>
			<section className='flexDisplay justifyCenter flexWrap alignItemsStart searchBar'>
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
				<div className='flexDisplayColumn fieldSet fontSize2_5 padding2'>
					<label htmlFor='typeOfUser' className='fontWeight500 padding1'>
						Type of service
					</label>
					<div className='fieldSet fontSize2_5 padding1'>
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
	getHelpers: PropTypes.func.isRequired,
};
/*connect to connect this component to redux and pass null as first parameter as we do not want any state updates 
second parameter is use to dispatch an action */
export default connect(null, { getDrivers, getHelpers })(SearchBar);
