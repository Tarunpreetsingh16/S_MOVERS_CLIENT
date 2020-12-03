/*Driver Card- Component used to display the available drivers available in the system*/
import React, { Fragment, useMemo } from 'react';
import star from './../../images/star.png';
import { Link } from 'react-router-dom';
export const ShowProfile = (props) => {
	const { dataFromParent } = props.location.state.dataFromParent;
	const { typeOfUser } = props.location.state.typeOfUser;
	/*Destructure the data sent from the parent */
	const {
		availability,
		carType,
		name,
		location,
		totalTrips,
		rating,
	} = dataFromParent;
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
			<li key={index} className='fontSize1_5 padding1'>
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
	let img = useMemo(() => {
		if (name) {
			return `https://robohash.org/${name}`;
		}
	}, [name]);
	return (
		<Fragment>
			<div
				className='flexDisplayColumn availabilitySection center alignItemsCenter padding2 shadow'
				style={{ margin: '2rem auto' }}
			>
				<h3 className='fontSize1_5'>
					{typeOfUser === 'driver' ? 'Driver' : 'Helper'} Profile
				</h3>
				<section className='flexDisplay padding2 justifyCenter alignItemsStart profileView'>
					<div className='flexDisplayColumn '>
						<div id='userImage'>
							<img className='' src={img} />
						</div>
						<h2
							className='fontSize1_5 padding2'
							style={{ textAlign: 'center' }}
						>
							{name}
						</h2>
					</div>
					<div>
						<div className='flexDisplayColumn padding2 '>
							<h3 className='fontSize1_5 fontWeight400 padding2 '>
								<strong className='fontSize1_5'>Location: </strong>
								{location.charAt(0).toUpperCase() + location.slice(1)}
							</h3>
							<h3 className='fontSize1_5 fontWeight400 padding2'>
								<strong className='fontSize1_5'>Total Services: </strong>
								{totalTrips}
							</h3>
							{typeOfUser === 'driver' ? (
								<h3 className='fontSize1_5 fontWeight400 padding2'>
									<strong className='fontSize1_5'>Car Type: </strong>
									{carType.toUpperCase()}
								</h3>
							) : null}

							<div>
								<h3 className='fontSize1_5 fontWeight400 padding2'>
									<strong className='fontSize1_5 '>Availability</strong>
								</h3>
								<ul className='flexDisplay flexWrap fontSize1_5 padding1'>
									{availabilityDisplay}
								</ul>
							</div>
						</div>
						<div className='flexDisplayColumn alignItemsStart'>
							<div>
								<h3 className='padding2 flexDisplay alignItemsCenter'>
									<strong className=' padding2 fontSize1_5'>Rating :</strong>
									<span className='fontSize1_5 fontWeight400'>
										{rating} &nbsp;
									</span>
									<img src={star} style={{ width: '5%' }}></img>
								</h3>
							</div>
							<Link
								to={{
									pathname: '/book',
									state: {
										city: dataFromParent.location,
										email: dataFromParent.email,
										typeOfUser: typeOfUser,
										fromURL: false,
									},
								}}
								className='padding2 '
								style={{ alignSelf: 'center' }}
							>
								<button className='btn btn-theme fontSize1_5 '>Book</button>
							</Link>
						</div>
					</div>
				</section>
			</div>
		</Fragment>
	);
};

export default ShowProfile;
