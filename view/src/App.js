import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoute from './util/PrivateRoute';
import Header from './uiComponents/Header';
import PublicPage from './pages/PublicPage';
import GlobalStyle from './GlobalStyle';
function App() {
  return (
    <div>
      <GlobalStyle/>
      <Header title={'The Recipe DeathMatch'} />
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/app/:view?" component={Home} />
          <Route exact path="/" component={PublicPage} />

          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
