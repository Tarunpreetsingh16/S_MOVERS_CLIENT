/*Driver Card- Component used to display the available drivers available in the system*/
import React, { Fragment, useState } from 'react';
import star from './../../images/star.png';
import { Redirect, Link } from 'react-router-dom';
export const Card = ({ dataFromParent, typeOfUser }) => {
	/*State to redirect the page to view driver profile */
	const [viewProfile, setViewProfile] = useState(false);
	/*Check if data is present in the data which is being sent from thwe parent*/
	if (!dataFromParent) return <div></div>;
	/*Destructure the data sent from the parent */
	const {
		availability,
		carType,
		name,
		location,
		totalTrips,
		rating,
	} = dataFromParent;
	/*show the index of the driver */
	const displayProfile = () => {
		setViewProfile(true);
	};
	/*Use availability array to display to the user*/
	const availabilityDisplay = availability.map((item, index) => {
		const date = new Date();
		date.setDate(date.getDate() - date.getDay() + index);
		date.setHours(0, 0, 0, 0);
		/*Check if driver is available on this day */
		if (item) {
			return (
				<li key={index} className='fontSize1_5'>
					<h3
						style={{
							padding: '1rem',
							textAlign: 'center',
							backgroundColor: '#99FF99',
							borderRadius: '50%',
						}}
					>
						Yes
					</h3>
					<h3>{date.toLocaleDateString()}</h3>
				</li>
			);
		}
		return (
			<li key={index} className='fontSize1_5'>
				<h3
					style={{
						padding: '1rem',
						textAlign: 'center',
						backgroundColor: '#FF6666',
						borderRadius: '50%',
					}}
				>
					No
				</h3>
				<h3>{date.toLocaleDateString()}</h3>
			</li>
		);
	});
	return viewProfile ? (
		<Redirect
			to={{
				pathname: '/viewProfile',
				state: {
					dataFromParent: { dataFromParent },
					typeOfUser: { typeOfUser },
				},
			}}
		/>
	) : (
		<Fragment>
			<section className='flexDisplay cardContainer padding2 pointer'>
				<div
					className='flexDisplayColumn'
					style={{ flexGrow: 2 }}
					onClick={displayProfile}
				>
					<h3 className='fontSize1_5 fontWeight400'>
						<strong className='fontSize1_5'>Name: </strong> {name}
					</h3>
					<h3 className='fontSize1_5 fontWeight400'>
						<strong className='fontSize1_5'>Location: </strong>
						{location
							? location.charAt(0).toUpperCase() + location.slice(1)
							: null}
					</h3>
					<h3 className='fontSize1_5 fontWeight400'>
						<strong className='fontSize1_5'>Total Services: </strong>
						{totalTrips}
					</h3>
					{typeOfUser === 'driver' ? (
						<h3 className='fontSize1_5 fontWeight400'>
							<strong className='fontSize1_5'>Car Type: </strong>
							{carType.toUpperCase()}
						</h3>
					) : null}
					<div>
						<h3 className='fontSize1_5 fontWeight400'>
							<strong className='fontSize1_5 '>Availability</strong>
						</h3>
						<ul className='flexDisplay flexWrap fontSize1_5'>
							{availabilityDisplay}
						</ul>
					</div>
				</div>
				<div className='flexDisplayColumn' style={{ flexGrow: '1' }}>
					<div style={{ flexGrow: '1' }}>
						<h3>
							<strong className='fontSize1_5'>Rating</strong>
						</h3>
						<pre className='fontSize1_5 flexDisplay alignItemsCenter'>
							{rating} &nbsp;
							<img src={star} style={{ width: '20%' }}></img>
						</pre>
					</div>
					<Link
						to={{
							pathname: '/book',
							state: {
								city: dataFromParent.location,
								email: dataFromParent.email,
								fromURL: false,
								typeOfUser: typeOfUser,
							},
						}}
					>
						<button className='btn btn-theme fontSize1_5'>Book</button>
					</Link>
				</div>
			</section>
		</Fragment>
	);
};

export default Card;
