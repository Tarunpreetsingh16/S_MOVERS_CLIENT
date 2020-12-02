import React, { Fragment, useState, useEffect } from 'react';
import { provinces } from './../../lib/servicableProvinces';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bookDriver } from './../../actions/booking';
import { cities } from './../../lib/servicableAreas';
export const BookingProposal = (props) => {
	const { bookDriver } = props;

	const { email } = props.location.state;
	const { city } = props.location.state;
	console.log(email, city);
	const [pickUp, setPickUpData] = useState({
		street: '',
		number: '',
		city: '',
		province: 'ontario',
		zipCode: '',
		country: 'Canada',
	});
	const [drop, setDropData] = useState({
		street: '',
		number: '',
		city: '',
		province: 'ontario',
		zipCode: '',
		country: 'Canada',
	});
	const [formData, setFormData] = useState({
		driverEmail: '',
		date: '',
		startTime: '',
		motive: '',
	});
	const submitData = () => {
		const dataToBeSubmitted = { ...formData, pickUp, drop };
		bookDriver(dataToBeSubmitted);
	};
	const updateFormData = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};
	const updateDropData = (e) => {
		setDropData({ ...drop, [e.target.name]: e.target.value });
	};

	const updatePickUpData = (e) => {
		setPickUpData({ ...pickUp, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		setFormData({ ...formData, driverEmail: email });
		setPickUpData({ ...pickUp, city: city });
		setDropData({ ...drop, city: city });
	}, []);
	const pickUpInputs = (
		<div className='center flexDisplayColumn bookingBlock'>
			<h3 className='fontSize1_5 padding2'>Pick up address: </h3>
			{/*Building number */}
			<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
				<label htmlFor='pickup.number' className='fontWeight500 padding1'>
					Building
				</label>
				<input
					type='number'
					name='number'
					min={1}
					id='pickup.number'
					className='padding1'
					required
					value={pickUp.number}
					onChange={updatePickUpData}
				></input>
				<h5 className='fontSize1_5 fontWeight400 colorDanger displayNone margin1_0'></h5>
			</div>

			{/**Street name */}
			<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
				<label htmlFor='pickup.street' className='fontWeight500 padding1'>
					Street
				</label>
				<input
					type='text'
					name='street'
					min={1}
					id='pickup.street'
					className='padding1'
					value={pickUp.street}
					onChange={updatePickUpData}
					required
				></input>
				<h5 className='fontSize1_5 fontWeight400 colorDanger displayNone margin1_0'></h5>
			</div>
			{/*City */}
			<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
				<label htmlFor='pickUp.city' className='fontWeight500 padding1'>
					City
				</label>
				<select
					name='city'
					id='pickUp.city'
					className='padding1'
					value={pickUp.city}
					onChange={updatePickUpData}
				>
					{cities.map((city) => {
						return (
							<option
								key={city.value}
								value={city.value}
								className='fontSize1_5'
								disabled={city.disabled}
								name='city'
							>
								{city.label}
							</option>
						);
					})}
				</select>
			</div>
			{/**Province */}
			<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
				<label htmlFor='pickup.province' className='fontWeight500 padding1'>
					Province
				</label>
				<select
					name='province'
					id='pickup.province'
					className='padding1'
					value={pickUp.province}
					onChange={updatePickUpData}
				>
					{provinces.map((province) => {
						return (
							<option
								key={province.value}
								value={province.value}
								className='fontSize1_5'
								disabled={province.disabled}
							>
								{province.label}
							</option>
						);
					})}
				</select>
			</div>
			{/*Zip code */}
			<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
				<label htmlFor='pickup.zipCode' className='fontWeight500 padding1'>
					Postal Code
				</label>
				<input
					type='text'
					name='zipCode'
					min={1}
					id='pickup.zipCode'
					className='padding1'
					required
					maxLength={6}
					value={pickUp.zipCode}
					onChange={updatePickUpData}
				></input>
				<h5 className='fontSize1_5 fontWeight400 colorDanger displayNone margin1_0'></h5>
			</div>
			<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
				<label htmlFor='pickup.country' className='fontWeight500 padding1'>
					Country
				</label>
				<input
					type='text'
					name='country'
					id='pickup.country'
					className='padding1'
					value='Canada'
					disabled
					value={pickUp.country}
					onChange={updatePickUpData}
				></input>
			</div>
		</div>
	);
	const dropInputs = (
		<div className='center flexDisplayColumn bookingBlock'>
			<h3 className='fontSize1_5 padding2'>Drop point address: </h3>
			{/*Building number */}
			<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
				<label htmlFor='drop.number' className='fontWeight500 padding1'>
					Building
				</label>
				<input
					type='number'
					name='number'
					min={1}
					id='drop.number'
					className='padding1'
					required
					value={drop.number}
					onChange={updateDropData}
				></input>
				<h5 className='fontSize1_5 fontWeight400 colorDanger displayNone margin1_0'></h5>
			</div>
			{/**Street name */}
			<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
				<label htmlFor='drop.street' className='fontWeight500 padding1'>
					Street
				</label>
				<input
					type='text'
					name='street'
					min={1}
					id='drop.street'
					className='padding1'
					required
					value={drop.street}
					onChange={updateDropData}
				></input>
				<h5 className='fontSize1_5 fontWeight400 colorDanger displayNone margin1_0'></h5>
			</div>
			{/*City */}
			<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
				<label htmlFor='drop.city' className='fontWeight500 padding1'>
					City
				</label>
				<select
					name='city'
					id='drop.city'
					className='padding1'
					value={drop.city}
					onChange={updateDropData}
				>
					{cities.map((city) => {
						return (
							<option
								key={city.value}
								value={city.value}
								className='fontSize1_5'
								disabled={city.disabled}
								name='city'
							>
								{city.label}
							</option>
						);
					})}
				</select>
			</div>
			{/**Province */}
			<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
				<label htmlFor='drop.province' className='fontWeight500 padding1'>
					Province
				</label>
				<select
					name='province'
					id='drop.province'
					className='padding1'
					value={drop.province}
					onChange={updateDropData}
				>
					{provinces.map((province) => {
						return (
							<option
								key={province.value}
								value={province.value}
								className='fontSize1_5'
								disabled={province.disabled}
							>
								{province.label}
							</option>
						);
					})}
				</select>
			</div>
			{/*Zip code */}
			<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
				<label htmlFor='drop.zipCode' className='fontWeight500 padding1'>
					Postal Code
				</label>
				<input
					type='text'
					name='zipCode'
					min={1}
					id='drop.zipCode'
					className='padding1'
					required
					maxLength={6}
					value={drop.zipCode}
					onChange={updateDropData}
				></input>
				<h5 className='fontSize1_5 fontWeight400 colorDanger displayNone margin1_0'></h5>
			</div>
			<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
				<label htmlFor='drop.country' className='fontWeight500 padding1'>
					Country
				</label>
				<input
					type='text'
					name='country'
					id='drop.country'
					className='padding1'
					value='Canada'
					disabled
					value={drop.country}
					onChange={updateDropData}
				></input>
			</div>
		</div>
	);
	const motive = (
		<div>
			<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
				<label htmlFor='motive' className='fontWeight500 padding1'>
					Motive
				</label>
				<input
					type='text'
					name='motive'
					id='motive'
					className='padding1'
					placeholder='Moving, Pick up a thing...'
					value={formData.motive}
					onChange={updateFormData}
				></input>
			</div>
		</div>
	);
	const dateAndTime = (
		<div>
			<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
				<label htmlFor='date' className='fontWeight500 padding1'>
					Date
				</label>
				<input
					type='date'
					name='date'
					id='date'
					className='padding1'
					value={formData.date}
					onChange={updateFormData}
				></input>
			</div>
			<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
				<label htmlFor='startTime' className='fontWeight500 padding1'>
					Time
				</label>
				<input
					type='time'
					name='time'
					id='startTime'
					className='padding1'
					value={formData.startTime}
					onChange={updateFormData}
				></input>
			</div>
		</div>
	);
	return (
		<Fragment>
			<div
				className=' availabilitySection center alignItemsCenter padding2 bookingBlock'
				style={{ margin: '2rem auto' }}
			>
				<h3 className='fontSize2_5 padding2 fontWeight400'>
					Provide booking details
				</h3>
				<div className='flexDisplay bookingLocations'>
					{pickUpInputs}
					{dropInputs}
				</div>
				{dateAndTime}
				{motive}
				<div className='padding2'>
					<button className='btn btn-theme fontSize1_5 ' onClick={submitData}>
						Send proposal
					</button>
				</div>
			</div>
		</Fragment>
	);
};
BookingProposal.propTypes = {
	bookDriver: PropTypes.func.isRequired,
};
export default connect(null, { bookDriver })(BookingProposal);
