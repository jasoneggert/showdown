import React from 'react';
import Recipes from '../../content/Recipes'
import axios from 'axios';
import { authMiddleWare } from '../../util/auth';
import { useHistory } from "react-router-dom";
import useAxios from 'axios-hooks'
import { useAuthedAxios} from '../../hooks/useAuthedAxios'

const Home = () => {
    const history = useHistory();
    authMiddleWare(history);
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    const [{ data: userData, loading: userLoading, error: userError }, { refetch: userRefetch }] = useAuthedAxios('/user');
    console.log('userData: ', userData, userError);
    if (userLoading) {
        return <div>Loading..</div>
    }

    if (userError) {
        console.log('error');
        history.push('./login')
    }

    return <div><Recipes /></div>
}

export default Home;