import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Loader from './../layout/Loader';
import { Redirect } from 'react-router-dom';
//Redux
import { connect } from 'react-redux';
import { deleteAccount } from './../../actions/auth';
import store from './../../store';
import { CLEAR_DELETE_ERRORS, DELETE_ACCOUNT } from './../../actions/types';

export const DeleteModal = ({ cancelModal, deleteAccount, deleteErrors }) => {
	/*State to store the updated field values */
	const [formData, setFormData] = useState({
		password: '',
	});
	/*State to update the error messages */
	const [messages, setMessages] = useState({
		password: '',
	});
	const messagesHack = {
		password: '',
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
	/*State to check if the page needs to show the loader or not */
	const [loader, setLoader] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const cancel = () => {
		store.dispatch({
			type: CLEAR_DELETE_ERRORS,
		});
		cancelModal();
	};
	const updateFormData = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const deletAccountAndRedirect = () => {
		hideErrors();
		deleteAccount(formData).then((res) => {
			if (res.status == 200) {
				triggerLoader();
				setTimeout(() => {
					store.dispatch({
						type: DELETE_ACCOUNT,
					});
				}, 5000);
			}
		});
	};
	/*method to trigger the loader */
	const triggerLoader = () => {
		setLoader(true);
	};
	/*To check if page is done loading then redirect to home screen*/
	if (loader) {
		setTimeout(() => setRedirect(true), 5000);
	}
	useEffect(() => {
		if (deleteErrors) {
			deleteErrors.map((error) => {
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
	}, [deleteErrors]);
	const deletForm = (
		<section id='modalBox' className=' flexDisplay alignItemsCenter'>
			<div
				id='modalHolder'
				className='flexDisplayColumn justifyCenter alignItemCenter center padding2'
			>
				<h2 className='fontSize1_5 padding1'>Confirm Password</h2>
				<div className='fieldSet flexDisplayColumn fontSize2_5 padding1'>
					<label htmlFor='password' className='fontWeight500 padding1'>
						Password
					</label>
					<input
						type='password'
						name='password'
						id='password'
						className='padding1'
						value={formData.password}
						onChange={updateFormData}
						required
					></input>
					<h5 className='fontSize1_5 fontWeight400 colorDanger displayNone margin1_0'>
						{messages.password}
					</h5>
				</div>
				<div className='flexDisplay'>
					<div className='padding2 '>
						<input
							type='submit'
							className='btn padding1 fontSize1_5 btn-danger'
							value='Delete'
							onClick={deletAccountAndRedirect}
						></input>
					</div>
					<div className='padding2'>
						<input
							type='submit'
							className='btn padding1 fontSize1_5 btn-theme'
							value='Cancel'
							onClick={cancel}
						></input>
					</div>
				</div>
			</div>
		</section>
	);
	return redirect ? (
		<Redirect to='/' />
	) : loader ? (
		<Loader msg='Hope to see you back!' />
	) : (
		<Fragment>{deletForm}</Fragment>
	);
};
DeleteModal.propTypes = {
	deleteAccount: PropTypes.func.isRequired,
};
/*map state which we want to use with the props */
const mapStateToProps = (state) => ({
	deleteErrors: state.auth.deleteErrors,
});
export default connect(mapStateToProps, { deleteAccount })(DeleteModal);
