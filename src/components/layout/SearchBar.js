import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { APP_KEY, APP_ID } from './../../dev';
import places from 'places.js';
import PropTypes from 'prop-types';
//Redux
import { getDrivers } from './../../actions/drivers';
export const SearchBar = ({ getDrivers }) => {
	const [location, setLocation] = useState();
	const [carType, setCarType] = useState();
	const [date, setDate] = useState();
	const [typeOfUser, setTypeOfUser] = useState();

	const setLocationFinder = () => {
		const fixedOptions = {
			appId: APP_ID,
			apiKey: APP_KEY,
			container: '#location',
		};
		const reconfigurableOptions = {
			language: 'eu',
			countries: ['ca'], // Search in the Canada
			aroundLatLngViaIP: false, // disable the extra search/boost around the source IP
			type: 'city',
			useDeviceLocation: false,
		};
		const placesAutoComplete = places(fixedOptions).configure(
			reconfigurableOptions
		);
	};
	useEffect(() => {
		setLocationFinder();
		getDrivers({ location, carType, date });
	}, []);

	let updateFilters = (e) => {
		switch (e.target.name) {
			case 'location':
				setLocation(e.target.value);
				getDrivers({ location, carType, date });
				break;
			case 'carType':
				setCarType(e.target.value);
				getDrivers({ location, carType, date });
				break;
			case 'date':
				setDate(e.target.value);
				getDrivers({ location, carType, date });
				break;
			case 'typeOfUser':
				setTypeOfUser(e.target.value);
				getDrivers({ location, carType, date });
				break;
			default:
				return;
		}
	};
	return (
		<Fragment>
			<section className='container flexDisplay justifyCenter flexWrap alignItemsCenter'>
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
						<option
							className='fontSize1_5'
							disabled
							defaultValue
							selected={true}
						>
							-- select an option --
						</option>
						<option value='hatchback' className='fontSize1_5'>
							Hatchback
						</option>
						<option value='sedan' className='fontSize1_5'>
							Sedan
						</option>
						<option value='truck' className='fontSize1_5'>
							Pickup Truck
						</option>
						<option value='suv' className='fontSize1_5'>
							SUV
						</option>
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
						id='date'
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
						id='date'
						className='padding1'
						value='helper'
						onChange={updateFilters}
					></input>
					<label htmlFor='helper' className='fontWeight500 padding1'>
						Helper
					</label>
				</div>
			</section>
		</Fragment>
	);
};

SearchBar.propTypes = {
	getDrivers: PropTypes.func.isRequired,
};
export default connect(null, { getDrivers })(SearchBar);
