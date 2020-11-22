import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//Redux
import { connect } from 'react-redux';
import { forgotPassword } from './../../actions/auth';

export const ForgotPasswordModal = ({
	forgotPassword,
	forgotPasswordErrors,
}) => {
	/*State to store the email id that will be entered by the user*/
	const [formData, setFormData] = useState({
		email: '',
		typeOfUser: 'booker',
	});
	/*State to update the error messages */
	const [messages, setMessages] = useState({
		email: '',
		msg: '',
		successMsg: '',
	});
	const messagesHack = {
		email: '',
		msg: '',
		successMsg: '',
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
		if (forgotPasswordErrors) {
			forgotPasswordErrors.map((error) => {
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
	}, [forgotPasswordErrors]);
	const updateData = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const sendData = () => {
		hideErrors();
		forgotPassword(formData).then((result) => {
			if (result.status == 200) {
				const messageBox = document.getElementById('successMsg').nextSibling;
				messageBox.classList.add('displayBlock');
				messageBox.classList.remove('displayNone');
				messageBox.classList.add('padding0_5');
				setMessages({
					...messages,
					successMsg: 'Email sent to change the password',
				});
			}
		});
	};
	return (
		<section id='modalBox' className=' flexDisplay alignItemsCenter'>
			<div
				id='modalHolder'
				className='flexDisplayColumn justifyCenter alignItemCenter center padding2'
			>
				<h2 className='fontSize1_5 padding1'>Enter registered email</h2>
				<div className='fieldSet flexDisplayColumn fontSize2_5 padding1'>
					<label htmlFor='email' className='fontWeight500 padding1'>
						Email
					</label>
					<input
						type='email'
						name='email'
						id='email'
						className='padding1'
						value={formData.email}
						onChange={updateData}
						required
					></input>
					<h5 className='fontSize1_5 fontWeight400 colorDanger displayNone margin1_0'>
						{messages.email}
					</h5>
				</div>
				<div className='fieldSet fontSize2_5 padding2'>
					<label className='fontWeight500 padding1 displayBlock'>
						Type of Account
					</label>
					<input
						type='radio'
						name='typeOfUser'
						className='padding1'
						value='booker'
						onChange={updateData}
						defaultChecked
					></input>
					<label htmlFor='booker' className='fontWeight500 padding1'>
						Booker
					</label>
					<input
						type='radio'
						name='typeOfUser'
						className='padding1'
						value='driver'
						onChange={updateData}
					></input>
					<label htmlFor='driver' className='fontWeight500 padding1'>
						Driver
					</label>
					<input
						type='radio'
						name='typeOfUser'
						className='padding1'
						onChange={updateData}
						value='helper'
					></input>
					<label htmlFor='helper' className='fontWeight500 padding1'>
						Helper
					</label>
				</div>
				<div id='msg'></div>
				<h5 className='fontSize1_5 fontWeight400 colorDanger displayNone margin1_0'>
					{messages.msg}
				</h5>

				<div id='successMsg'></div>
				<h5 className='fontSize1_5 fontWeight400 colorSuccess displayNone margin1_0'>
					{messages.successMsg}
				</h5>
				<div className='flexDisplay'>
					<div className='padding2'>
						<input
							type='submit'
							className='btn padding1 fontSize1_5 btn-theme'
							value='Send'
							onClick={sendData}
						></input>
					</div>
					<Link
						to='/login'
						className='fontSize2_5 navBarLinks padding2 '
						style={{ textDecoration: 'none' }}
					>
						<div type='submit' className='btn padding1 fontSize1_5 btn-danger'>
							Cancel
						</div>
					</Link>
				</div>
			</div>
		</section>
	);
};

ForgotPasswordModal.propTypes = {
	forgotPassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	forgotPasswordErrors: state.auth.forgotPasswordErrors,
});
export default connect(mapStateToProps, { forgotPassword })(
	ForgotPasswordModal
);
