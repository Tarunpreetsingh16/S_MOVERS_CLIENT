import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Loader from './../layout/Loader';
//React Router
import { Redirect } from 'react-router-dom';
//Redux
import { connect } from 'react-redux';
import { login, loadUser } from './../../actions/auth';

export const Login = ({ loginErrors, loadUser, login, isAuthenticated }) => {
	const [loading, setLoading] = useState(true);
	/*State to store the form data which is updated on data change  */
	const [formData, setFormData] = useState({
		typeOfUser: 'booker',
		email: '',
		password: '',
	});
	/*State to store the errors which are updated on form submission  */
	const [messages, setMessages] = useState({
		email: '',
		password: '',
		notFound: '',
	});
	const messagesHack = {
		email: '',
		password: '',
		notFound: '',
	};

	if (isAuthenticated) {
		document.getElementById('form').disabled = true;
		setTimeout(() => setLoading(false), 3000);
	}

	useEffect(() => {
		if (loginErrors) {
			loginErrors.map((error) => {
				if (document.getElementById(error.param)) {
					const messageBox = document.getElementById(error.param).nextSibling;
					messagesHack[error.param] = error.msg;
					messageBox.classList.add('displayBlock');
					messageBox.classList.remove('displayNone');
					messageBox.classList.add('padding0_5');
				}
			});
		}
		setMessages(messagesHack);
	}, [loginErrors]);

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
	/*method to update the state of data to show the sign up form accordingly */
	const updateData = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const submitForm = (e) => {
		e.preventDefault();
		hideErrors();
		//call the signup action by sending form data
		login(formData).then(() => {
			loadUser();
		});
	};
	const form = (
		<form className='flexDisplayColumn' id='form'>
			<div className='fontSize2_5 padding1'>Login</div>
			<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
				<label htmlFor='email' className='fontWeight500 padding1'>
					Email
				</label>
				<input
					type='email'
					name='email'
					id='email'
					className='padding1'
					required
					value={formData.email}
					onChange={updateData}
				></input>
				<h5 className='fontSize1_5 fontWeight400 colorDanger displayNone margin1_0'>
					{messages.email}
				</h5>
			</div>
			<div className='fieldSet flexDisplayColumn fontSize2_5 padding2'>
				<label htmlFor='password' className='fontWeight500 padding1'>
					Password
				</label>
				<input
					type='password'
					name='password'
					id='password'
					className='padding1'
					required
					value={formData.password}
					onChange={updateData}
				></input>
				<h5 className='fontSize1_5 fontWeight400 colorDanger displayNone margin1_0'>
					{messages.password}
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
					defaultChecked
					onChange={updateData}
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
					value='helper'
					onChange={updateData}
				></input>
				<label htmlFor='helper' className='fontWeight500 padding1'>
					Helper
				</label>
			</div>
			<input hidden id='notFound'></input>
			<h5 className='fontSize1_5 fontWeight400 colorDanger displayNone margin1_0'>
				{messages.notFound}
			</h5>
			<div className='padding2'>
				<input
					type='submit'
					className='btn padding2 fontSize1_5 btn-theme width50'
					value='Submit'
					onClick={submitForm}
				></input>
			</div>
		</form>
	);
	return (
		<Fragment>
			{isAuthenticated && <Loader />}
			{
				/*Check  if the user has been loaded into the system*/
				isAuthenticated && !loading && <Redirect to='/' />
			}
			{form}
		</Fragment>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	loadUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	loginErrors: state.auth.loginErrors,
	isAuthenticated: state.auth.isAuthenticated,
});

/*We use connect() to connect any component that we want to use with redux
1st parameter is maptStateToProps which states the state values that we want to use in this component */
export default connect(mapStateToProps, { login, loadUser })(Login);
