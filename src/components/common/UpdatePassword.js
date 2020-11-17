import React, { useEffect, useState } from 'react';
import { updatePassword } from './../../actions/auth';
import PropTypes from 'prop-types';
import { LOGOUT_USER } from './../../actions/types';
import store from './../../store';
//redux
import { connect } from 'react-redux';
export const UpdatePassword = ({ updatePassword, errors, triggerLoader }) => {
	/*State to store the form data when it changes */
	const [formData, setFormData] = useState({
		currentPassword: '',
		password: '',
		confirmPassword: '',
	});
	/*State to store the errors which are updated on form submission  */
	const [messages, setMessages] = useState({
		currentPassword: '',
		password: '',
		confirmPassword: '',
		otherMessage: '',
	});
	const messagesHack = {
		currentPassword: '',
		password: '',
		confirmPassword: '',
		otherMessage: '',
	};
	const updateData = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
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
	useEffect(() => {
		hideErrors();
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
			setMessages(messagesHack);
		} else if (!errors) {
			setFormData({
				...messages,
				password: '',
				currentPassword: '',
				confirmPassword: '',
			});
		}
	}, [errors]);
	/*Method to submit the data/password */
	const submitData = () => {
		updatePassword(formData).then((res) => {
			if (res.status == 200) {
				triggerLoader();
				setTimeout(() => {
					store.dispatch({
						type: LOGOUT_USER,
					});
				}, 5000);
			}
		});
	};

	return (
		<div>
			<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
				<label htmlFor='currentPassword' className='fontWeight500 padding1'>
					Current Password
				</label>
				<input
					type='password'
					name='currentPassword'
					id='currentPassword'
					className='padding1'
					value={formData.currentPassword}
					onChange={updateData}
					required
				></input>
				<h5 className='fontSize1_5 fontWeight400 colorDanger displayNone margin1_0'>
					{messages.currentPassword}
				</h5>
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
					value={formData.password}
					onChange={updateData}
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
					value={formData.confirmPassword}
					onChange={updateData}
					required
				></input>
				<h5 className='fontSize1_5 fontWeight400 colorDanger displayNone margin1_0'>
					{messages.confirmPassword}
				</h5>
				<div id='otherError'></div>
				<h5 className='fontSize1_5 fontWeight400 colorSuccess margin1_0'>
					{messages.otherError}
				</h5>
			</div>
			<div className='padding2 '>
				<input
					type='submit'
					className='btn padding1 fontSize1_5 btn-theme'
					value='Change Password'
					onClick={submitData}
				></input>
			</div>
		</div>
	);
};

/*Proptypes to typecheck*/
UpdatePassword.propTypes = {
	updatePassword: PropTypes.func.isRequired,
};
/*Map the redux store thsi component */
const mapStateToProps = (state) => ({
	errors: state.auth.updatePasswordErrors,
});
export default connect(mapStateToProps, { updatePassword })(UpdatePassword);
