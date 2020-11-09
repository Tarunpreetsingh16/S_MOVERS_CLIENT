import './App.css';
import React, { Fragment } from 'react';
import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { getDrivers } from './actions/drivers';

const App = () => {
	return (
		<Provider store={store}>
			<Fragment>
				<NavBar />
				<Landing />
			</Fragment>
		</Provider>
	);
};
export default App;
