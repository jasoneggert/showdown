import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoute from './util/PrivateRoute';
import Header from './uiComponents/Header';
function App() {
	const authToken = localStorage.getItem('AuthToken');

	return (
		<Router>
			<div>
			<Header title={'Recipe DeathMatch'} />

				<Switch>
					<Route
						exact
						path='/'
						render={() => (
							<Redirect to={authToken ? '/app' : '/login'} />
						)}
					/>
					<PrivateRoute exact path='/app/:view?' component={Home} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/signup' component={Signup} />
				</Switch>
			</div>
		</Router>
	)

}

export default App;
