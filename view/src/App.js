import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Header from './uiComponents/Header'

function App() {
	return (
		<React.Fragment>
			<Header title={'Recipe DeathMatch'} />
			<Router>
				<div>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/login" component={Login} />
						{/*<Route exact path="/signup" component={signup} /> */}
					</Switch>
				</div>
			</Router>
		</React.Fragment>
	)

}

export default App;
