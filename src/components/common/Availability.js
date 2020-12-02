import React, { Fragment, useState, useEffect } from 'react';
import { week } from './../../lib/week';
import PropTypes from 'prop-types';
//Redux
import { provideAvailability, getAvailability } from './../../actions/booking';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import store from './../../store';
export const Availability = ({
	provideAvailability,
	isAuthenticated,
	availability,
	dateUpdated,
	getAvailability,
}) => {
	const [redirect, setRedirect] = useState(false);
	const [data, setData] = useState({
		availability: [0, 0, 0, 0, 0, 0, 0],
	});
	/*State to show the error */
	const [messages, setMessages] = useState({
		errorMsg: '',
		successMsg: '',
	});
	const updateData = (e) => {
		const updatedAvailability = data.availability.map((item, index) => {
			if (e.target.attributes.day.value == index) {
				return Number(e.target.value);
			}
			return item;
		});
		setData({ ...data, availability: updatedAvailability });
	};
	const options = ['No', 'Yes'];
	const checkSunday = new Date();
	checkSunday.setHours(0, 0, 0, 0);
	const dates = [];
	for (var i = 0; i < 7; i++) {
		const date = new Date();
		date.setHours(0, 0, 0, 0);
		date.setDate(date.getDate() + i);
		dates.push(date);
	}
	const submitAvailability = () => {
		provideAvailability(data).then((result) => {
			if (result.status == 200) {
				getAvailability();
				setMessages({
					...messages,
					errorMsg: '',
					successMsg: 'Availability Updated!',
				});
			} else {
				setMessages({
					...messages,
					errorMsg: 'Please try again later!',
					successMsg: '',
				});
			}
		});
	};

	useEffect(() => {
		getAvailability();
		if (!isAuthenticated) {
			setRedirect(true);
		}
		if (messages.successMsg.trim().length != 0) {
			//Display the success message
			const messageBox = document.getElementById('successMsg').nextSibling;
			messageBox.classList.add('displayBlock');
			messageBox.classList.remove('displayNone');
			messageBox.classList.add('padding0_5');
			messageBox.classList.remove('displayBlock');
			messageBox.classList.add('displayNone');
			messageBox.classList.remove('padding0_5');
		} else if (messages.errorMsg.trim().length != 0) {
			//Display the success message
			const messageBox = document.getElementById('errorMsg').nextSibling;
			messageBox.classList.add('displayBlock');
			messageBox.classList.remove('displayNone');
			messageBox.classList.add('padding0_5');
			messageBox.classList.remove('displayBlock');
			messageBox.classList.add('displayNone');
			messageBox.classList.remove('padding0_5');
		}
	}, [isAuthenticated]);
	const prevUpdatedDate = new Date(dateUpdated);
	const providedAvailability = (
		<div
			className='flexDisplayColumn availabilitySection center alignItemsCenter padding2 shadow'
			style={{ margin: '2rem auto' }}
		>
			<h3 className='fontSize1_5'>Last updated availability</h3>
			{dates.map((date, index) => {
				return (
					<div
						key={index}
						className=' padding2 flexDisplay alignItemsCenter justifySpaceBetween'
					>
						<div
							className='fontSize1_5 fontWeight500'
							style={{ margin: 'auto 2rem' }}
						>
							{`${date.toLocaleDateString()}, 
                            ${week[date.getDay()]}`}
						</div>
						{availability[index] == 0 ? (
							<div className='fontSize1_5 colorDanger padding0_5'>
								{options[availability[index]]}
							</div>
						) : (
							<div className='fontSize1_5 colorSuccess padding0_5'>
								{options[availability[index]]}
							</div>
						)}
					</div>
				);
			})}

			<div className='fontSize1_5 margin2'>
				<span className='fontSize1_5 fontWeight500'>Last udpated -</span>
				{`${prevUpdatedDate.toLocaleDateString()}, 
                            ${week[prevUpdatedDate.getDay()]}`}
			</div>
		</div>
	);

	const getUpdatedAvailability = (
		<div
			className='flexDisplayColumn availabilitySection center alignItemsCenter padding2 shadow'
			style={{ margin: '2rem auto' }}
		>
			<h3 className='fontSize1_5'>Provide availability</h3>
			{dates.map((date, index) => {
				return (
					<div
						key={index}
						className=' padding2 flexDisplay alignItemsCenter justifySpaceBetween'
					>
						<div className='fontSize1_5' style={{ margin: 'auto 2rem' }}>
							{`${date.toLocaleDateString()}, 
                            ${week[date.getDay()]}`}
						</div>
						<div>
							<select
								className='fontSize1_5 padding1 '
								style={{ margin: 'auto 2rem' }}
								day={index}
								name='option'
								onChange={updateData}
								value={data.availability[index]}
							>
								{options.map((option, index) => {
									return (
										<option key={index} value={index} className='fontSize1_5'>
											{option}
										</option>
									);
								})}
							</select>
						</div>
					</div>
				);
			})}

			<div id='successMsg'></div>
			<h5 className='fontSize1_5 fontWeight400 colorSuccess margin1_0'>
				{messages.successMsg}
			</h5>
			<div id='errorMsg'></div>
			<h5 className='fontSize1_5 fontWeight400 colorDanger margin1_0'>
				{messages.errorMsg}
			</h5>
			<div className='padding2 '>
				<input
					type='submit'
					className='btn  padding1 fontSize1_5 btn-theme'
					value='Submit'
					onClick={submitAvailability}
				></input>
			</div>
		</div>
	);
	return redirect ? (
		<Redirect to='/' />
	) : (
		<Fragment>
			<div
				className='fontSize2_5 padding1 flexDisplay justifyCenter'
				id='profileTitle'
			>
				Availability
			</div>
			<div className='flexDisplay' id='availabilityBlock'>
				{providedAvailability}
				{checkSunday.getDay() === 0 ? getUpdatedAvailability : null}
			</div>
		</Fragment>
	);
};
Availability.propTypes = {
	provideAvailability: PropTypes.func.isRequired,
	getAvailability: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	availability: state.booking.availability,
	dateUpdated: state.booking.dateUpdated,
});
export default connect(mapStateToProps, {
	provideAvailability,
	getAvailability,
})(Availability);
