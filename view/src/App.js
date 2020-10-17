import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

import { useAuthedAxios } from './hooks/useAuthedAxios';
function App() {
	return (
			<Router>
				<div>
					<Switch>
						<Route exact path="/app/:view?" component={Home} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/signup" component={Signup} />
					</Switch>
				</div>
			</Router>
	)

}

export default App;
