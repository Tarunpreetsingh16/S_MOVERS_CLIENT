import React, { useEffect, useState } from 'react';
import { bookingResponse } from './../../actions/booking';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
export const BookingResponse = (props) => {
	const accept = props.match.params.accept;
	const id = props.match.params.id;
	const typeOfUser = props.match.params.typeOfUser;
	const { bookingResponse } = props;
	const [mount, setMount] = useState(false);
	/*State to update the error messages */
	const [messages, setMessages] = useState({
		error: null,
		success: null,
	});
	useEffect(() => {
		if (!mount) {
			bookingResponse({ accept, id, typeOfUser }).then((res) => {
				if (res.status == 200) {
					if (accept == 'true')
						setMessages({
							...messages,
							error: null,
							success:
								'You accepted the request. If you want to cancel it go to your bookings!',
						});
					else {
						setMessages({
							...messages,
							error: null,
							success:
								'You rejected the request. Login to see upcoming bookings!',
						});
					}
				} else {
					setMessages({
						...messages,
						success: null,
						error: 'Cannot use the link again!',
					});
				}
			});
		}
		setMount(true);
	}, [mount]);
	useEffect(() => {
		if (messages.error) {
			document.getElementById('msg').classList.add('colorDanger');
			document.getElementById('msg').classList.remove('colorSuccess');
			document.getElementById('msg').classList.remove('displayNone');
		} else if (messages.success) {
			document.getElementById('msg').classList.add('colorSuccess');
			document.getElementById('msg').classList.remove('colorDanger');
			document.getElementById('msg').classList.remove('displayNone');
		} else {
			document.getElementById('msg').classList.add('displayNone');
			document.getElementById('msg').classList.add('padding0_5');
			document.getElementById('msg').classList.remove('colorDanger');
			document.getElementById('msg').classList.remove('colorSuccess');
		}
	}, [messages]);
	return (
		<div className='center alignItemsCenter padding2 bookingBlock'>
			<h5 className='fontSize1_5 fontWeight400 displayNone margin1_0' id='msg'>
				{messages.error ? messages.error : messages.success}
			</h5>
		</div>
	);
};

BookingResponse.propTypes = {
	bookingResponse: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	responseErrors: state.booking.responseErrors,
});

export default connect(mapStateToProps, { bookingResponse })(BookingResponse);
