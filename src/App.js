import './App.css';
import React, { Fragment } from 'react';
import NavBar from './components/layout/NavBar';
import Card from './components/layout/DriverCard';
import Landing from './components/layout/Landing';
//Redux
import { Provider } from 'react-redux';
import store from './store';

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
