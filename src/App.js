import './App.css';
import React, { Fragment, useEffect } from 'react';
import NavBar from './components/layout/NavBar';
import Alert from './components/layout/Alert';
import Landing from './components/layout/Landing';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	withRouter,
} from 'react-router-dom';
//Redux

const App = () => {
	return (
		<Router>
			<Fragment>
				<Alert />
				<NavBar />
				<Switch>
					<Route exact path='/' component={withRouter(Landing)} />
					<Route exact path='/signUp' component={SignUp} />
					<Route exact path='/login' component={Login} />
				</Switch>
			</Fragment>
		</Router>
	);
};
export default App;
