import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
//redux
import { connect } from 'react-redux';
import { changePassword } from './../../actions/auth';
export const ChangePassword = (props) => {
	const id = props.match.params.id;
	const changePassword = props.changePassword;
	const errors = props.changePasswordErrors;
	const [formData, setFormData] = useState({
		password: '',
		confirmPassword: '',
	});
	/*State to update the error messages */
	const [messages, setMessages] = useState({
		password: '',
		confirmPassword: '',
		msg: '',
		otherError: '',
	});
	const messagesHack = {
		password: '',
		confirmPassword: '',
		msg: '',
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
			setMessages(messagesHack);
		}
		return () => {
			hideErrors();
		};
	}, [errors]);

	const updateData = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const sendData = () => {
		hideErrors();
		changePassword(formData, id).then((result) => {
			if (result.status == 200) {
				const messageBox = document.getElementById('msg').nextSibling;
				messageBox.classList.add('displayBlock');
				messageBox.classList.remove('displayNone');
				messageBox.classList.add('padding0_5');
				setMessages({
					...messages,
					msg: 'Password changed! Try login.',
				});
			}
		});
	};
	return (
		<Fragment>
			<div id='changePassword'>
				<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
					<label htmlFor='password' className='fontWeight500 padding1'>
						New Password
					</label>
					<input
						type='password'
						name='password'
						id='password'
						className='padding1'
						onChange={updateData}
						value={formData.password}
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
						value={formData.confirmPassword}
						required
					></input>
					<h5 className='fontSize1_5 fontWeight400 colorDanger displayNone margin1_0'>
						{messages.confirmPassword}
					</h5>
					<div id='msg'></div>
					<h5 className='fontSize1_5 fontWeight400 colorSuccess margin1_0'>
						{messages.msg}
					</h5>
					<div id='otherError'></div>
					<h5 className='fontSize1_5 fontWeight400 colorDanger margin1_0'>
						{messages.otherError}
					</h5>
				</div>

				<div className='padding2 '>
					<input
						type='submit'
						className='btn padding1 fontSize1_5 btn-theme flexDisplay center'
						value='Change Password'
						onClick={sendData}
					></input>
				</div>
			</div>
		</Fragment>
	);
};
ChangePassword.propTypes = {
	changePassword: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	changePasswordErrors: state.auth.changePasswordErrors,
});
export default connect(mapStateToProps, { changePassword })(ChangePassword);
