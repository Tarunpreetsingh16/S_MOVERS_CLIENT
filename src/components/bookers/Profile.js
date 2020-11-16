import React, { Fragment, useEffect, useMemo, useState } from 'react';
import star from './../../images/star.png';
import PropTypes from 'prop-types';
//Redux
import { updateBookerInfo, loadUser } from './../../actions/auth';
import { connect } from 'react-redux';

export const Profile = ({ user, updateBookerInfo, updateErrors, loadUser }) => {
	/*State to store the data from the udpate form  */
	const [formData, setFormData] = useState({
		email: '',
		phone: '',
		password: '',
		confirmPassword: '',
	});
	/*State to store whether we are showing Editable fields or non editable fields */
	const [editing, setEditing] = useState(false);
	/*State to store the errors which are updated on form submission  */
	const [messages, setMessages] = useState({
		email: '',
		phone: '',
		otherError: '',
	});
	const messagesHack = {
		email: '',
		phone: '',
		otherError: '',
	};
	/*To hide the errors on changing the type of user */
	const hideErrors = () => {
		const messageBoxes = document.querySelectorAll('h5');
		let i = 0;
		for (; i < messageBoxes.length; i++) {
			messageBoxes[i].classList.remove('displayBlock');
			messageBoxes[i].classList.add('displayNone');
			messageBoxes[i].classList.remove('padding0_5');
		}
	};
	let img = useMemo(() => {
		if (user) {
			return `https://robohash.org/${user.name}`;
		}
	}, [user]);
	/*useEffect */
	useEffect(() => {
		if (user && !editing) {
			setFormData({
				...formData,
				email: user.email ? user.email : '',
				phone: user.phone ? user.phone : '',
			});
		} else if (editing && formData) {
			setFormData({
				...formData,
				email: formData.email ? formData.email : '',
				phone: formData.phone ? formData.phone : '',
			});
		}
		if (updateErrors) {
			updateErrors.map((error) => {
				if (document.getElementById(error.param)) {
					const messageBox = document.getElementById(error.param).nextSibling;
					messagesHack[error.param] = error.msg;
					messageBox.classList.add('displayBlock');
					messageBox.classList.remove('displayNone');
					messageBox.classList.add('padding0_5');
				}
			});
			setMessages(messagesHack);
		} else if (!updateErrors && editing) {
			cancelEditing();
			//Display the success message
			const messageBox = document.getElementById('otherError').nextSibling;
			messageBox.classList.add('displayBlock');
			messageBox.classList.remove('displayNone');
			messageBox.classList.add('padding0_5');
			setMessages({
				...messages,
				email: '',
				phone: '',
				otherError: 'Updated Successfully!',
			});
		}
	}, [user, updateErrors]);
	/*method to display the editable fields and hide non editablefields */
	const editOrConfirm = () => {
		hideErrors();
		if (!editing) {
			//if button shows 'Edit' text hide non editable fields and show editable fields
			const nonEditables = document.getElementsByClassName(
				'nonEditableFieldSet'
			);
			let i;
			for (i = 0; i < nonEditables.length; i++) {
				nonEditables[i].classList.add('displayNone');
				nonEditables[i].classList.remove('displayBlock');
			}
			const editables = document.getElementsByClassName('editableFieldSet');
			for (i = 0; i < editables.length; i++) {
				editables[i].classList.remove('displayNone');
				editables[i].classList.add('displayBlock');
			}
			setEditing(true);
		}

		if (editing) {
			updateBookerInfo(formData).then(() => {
				loadUser();
			});
		}
	};
	const cancel = () => {
		hideErrors();
		cancelEditing();
		if (user)
			setFormData({
				...formData,
				email: user.email ? user.email : '',
				phone: user.phone ? user.phone : '',
			});
	};
	const cancelEditing = () => {
		if (editing) {
			//if button shows 'Cancel' text show non editable fields and hide editable fields
			const nonEditables = document.getElementsByClassName(
				'nonEditableFieldSet'
			);
			let i;
			for (i = 0; i < nonEditables.length; i++) {
				nonEditables[i].classList.add('displayBlock');
				nonEditables[i].classList.remove('displayNone');
			}
			const editables = document.getElementsByClassName('editableFieldSet');
			for (i = 0; i < editables.length; i++) {
				editables[i].classList.remove('displayBlock');
				editables[i].classList.add('displayNone');
			}
		}

		setEditing(false);
	};
	/*Method to update the form data when user changes any data on the page */
	const updateFormData = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	return (
		<Fragment>
			<section className='flexDisplay padding2 justifyCenter alignItemsStart updateForm'>
				<div className='flexDisplayColumn '>
					<div id='userImage'>
						<img className='' src={img} />
					</div>
					<h2 className='fontSize1_5 padding2' style={{ textAlign: 'center' }}>
						{user ? user.name : ''}
					</h2>
				</div>
				<div className='flexDisplayColumn'>
					<div className='flexDisplayColumn fontSize2_5 padding2 '>
						<label htmlFor='email' className='fontWeight500 padding1'>
							Email
						</label>
						<div className='padding1 nonEditableFieldSet'>
							{user ? user.email : ''}
						</div>
						<input
							type='email'
							name='email'
							id='email'
							value={formData ? formData.email : ''}
							className='padding1 displayNone editableFieldSet'
							required
							onChange={updateFormData}
						></input>
						<h5 className='fontSize1_5 fontWeight400 colorDanger displayNone margin1_0'>
							{messages.email}
						</h5>
					</div>
					<div className='flexDisplayColumn fontSize2_5 padding2 '>
						<label htmlFor='phone' className='fontWeight500 padding1'>
							Phone
						</label>
						<div className='padding1 nonEditableFieldSet'>
							{user && user.phone ? user.phone : 'Not provided'}
						</div>
						<input
							type='phone'
							name='phone'
							id='phone'
							value={formData && formData.phone ? formData.phone : ''}
							className='padding1 displayNone editableFieldSet'
							required
							onChange={updateFormData}
						></input>
						<h5 className='fontSize1_5 fontWeight400 colorDanger displayNone margin1_0'>
							{messages.phone}
						</h5>
					</div>
					<div id='otherError'></div>
					<h5 className='fontSize1_5 fontWeight400 colorSuccess margin1_0'>
						{messages.otherError}
					</h5>
					<div className='flexDisplay'>
						<div className='padding2'>
							<input
								type='submit'
								className='btn padding1 fontSize1_5 btn-theme'
								value={!editing ? 'Edit' : 'Confirm'}
								onClick={editOrConfirm}
							></input>
						</div>
						<div className='padding2 '>
							<input
								type='submit'
								className='btn colorDanger padding1 fontSize1_5 btn-danger displayNone editableFieldSet'
								value='Cancel'
								onClick={cancel}
							></input>
						</div>
					</div>
					<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
						<label htmlFor='password' className='fontWeight500 padding1'>
							New Password
						</label>
						<input
							type='password'
							name='password'
							id='password'
							className='padding1'
							required
							onChange={updateFormData}
						></input>
						<h5 className='fontSize1_5 fontWeight400 colorDanger displayNone margin1_0'></h5>
					</div>

					<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
						<label htmlFor='confirmPassword' className='fontWeight500 padding1'>
							Confirm Password
						</label>
						<input
							type='confirmPassword'
							name='confirmPassword'
							id='passconfirmPasswordword'
							className='padding1'
							required
							onChange={updateFormData}
						></input>
						<h5 className='fontSize1_5 fontWeight400 colorDanger displayNone margin1_0'></h5>
					</div>
					<div className='padding2 '>
						<input
							type='submit'
							className='btn padding1 fontSize1_5 btn-theme'
							value='Change Password'
						></input>
					</div>
				</div>
				<div>
					<div className='flexDisplayColumn fontSize2_5 padding2 '>
						<label className='fontWeight500 padding1'>
							Rating
							<em className='fontSize0_5'>
								(provided by drivers and helpers){' '}
							</em>
						</label>
						<div className='padding1 flexDisplay alignItemsCenter'>
							{user ? user.rating : ''} &nbsp;
							<img src={star} style={{ width: '10%' }}></img>
						</div>
					</div>
					<div className='flexDisplayColumn fontSize2_5 padding2 '>
						<label className='fontWeight500 padding1'>Services booked</label>
						<div className='padding1 flexDisplay alignItemsCenter'>
							{user ? user.numberOfServices : ''} &nbsp;
						</div>
					</div>
				</div>
			</section>
		</Fragment>
	);
};
Profile.propTypes = {
	updateBookerInfo: PropTypes.func.isRequired,
	loadUser: PropTypes.func.isRequired,
};
/*map state which we want to use with the props */
const mapStateToProps = (state) => ({
	user: state.auth.user,
	updateErrors: state.auth.updateErrors,
});
export default connect(mapStateToProps, { updateBookerInfo, loadUser })(
	Profile
);
