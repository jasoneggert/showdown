import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoute from './util/PrivateRoute';
import Header from './uiComponents/Header';
import { BrowserRouter } from "react-router-dom";
import { useAuthedAxios } from './hooks/useAuthedAxios';
import { useHistory } from 'react-router-dom';
import { authMiddleWare } from './util/auth';
function App() {
  const authToken = localStorage.getItem('AuthToken');
  const history = useHistory();
  authMiddleWare(history);
  const [
    { data: userData, loading: userLoading, error: userError },
    { refetch: userRefetch },
  ] = useAuthedAxios('/user');

  console.log('userData: ', userData);
  if (userLoading) {
    return <div>Loading..</div>;
  }

  if (userError) {
    console.log('error');
    history.push('/login');
  }
  return (
    <div>
      <Header title={'The Recipe DeathMatch'} />
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/app/:view?" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
