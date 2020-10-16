import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Header from './uiComponents/Header'
function App() {
	return (
		<React.Fragment>
			<Header title={'Recipe DeathMatch'} />
			<Router>
				<div>
					<Switch>
						<Route exact path="/" children={props => {
							return <Home />
						}} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/signup" component={Signup} />
					</Switch>
				</div>
			</Router>
		</React.Fragment>
	)

}

export default App;
