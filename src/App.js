import './App.css';
import React, { Fragment, useEffect, useState } from 'react';
import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import BookerProfile from './components/bookers/Profile';
import DeleteModal from './components/common/DeleteModal';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
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
						<Route exact path='/booker/profile' component={BookerProfile} />
						<Route exact path='/modal' component={DeleteModal} />
					</Switch>
				</Fragment>
			</Router>
		</Provider>
	);
};
export default App;
