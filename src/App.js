import './App.css';
import React, { Fragment, useEffect, useState } from 'react';
import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import BookerProfile from './components/bookers/Profile';
import ShowProfile from './components/bookers/ShowProfile';
import Bookings from './components/bookers/Bookings';
import DriverProfile from './components/drivers/Profile';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//Redux
import { loadUser } from './actions/auth';
import { Provider } from 'react-redux';
import store from './store';
const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	});
	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<NavBar />
					<Switch>
						<Route exact path='/' component={Landing} />
						<Route exact path='/signUp' component={SignUp} />
						<Route exact path='/login' component={Login} />
						<Route
							exact
							path='/viewProfile'
							render={(props) => <ShowProfile {...props} />}
						/>
						<Route exact path='/booker/profile' component={BookerProfile} />
						<Route exact path='/bookings' component={Bookings} />
						<Route exact path='/driver/profile' component={DriverProfile} />
					</Switch>
				</Fragment>
			</Router>
		</Provider>
	);
};
export default App;
