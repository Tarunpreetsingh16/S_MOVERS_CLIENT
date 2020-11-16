import React, { Fragment, useEffect, useMemo, useState } from 'react';
import star from './../../images/star.png';
import { withRouter } from 'react-router-dom';
//Redux
import { connect } from 'react-redux';

export const Profile = ({ user }) => {
	/*State to store the data from the udpate form  */
	const [formData, setFormData] = useState({
		email: '',
		phone: '',
		password: '',
		confirmPassword: '',
	});
	/*State to store whether we are showing Editable fields or non editable fields */
	const [editing, setEditing] = useState(false);
	let img = useMemo(() => {
		if (user) {
			return `https://robohash.org/${user.name}`;
		}
	}, [user]);
	/*useEffect */
	useEffect(() => {
		if (user) {
			setFormData({
				...formData,
				email: user.email,
				phone: user.phone ? user.phone : '',
			});
		}
	}, [user]);
	/*method to display the editable fields and hide non editablefields */
	const editOrConfirm = () => {
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
	};
	const cancel = () => {
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
			setEditing(false);
		}
		setFormData({
			...formData,
			email: user.email,
			phone: user.phone ? user.phone : '',
		});
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
						<h5 className='fontSize1_5 fontWeight400 colorDanger displayNone margin1_0'></h5>
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
						<h5 className='fontSize1_5 fontWeight400 colorDanger displayNone margin1_0'></h5>
					</div>
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
/*map state which we want to use with the props */
const mapStateToProps = (state) => ({
	user: state.auth.user,
});
export default connect(mapStateToProps)(Profile);
