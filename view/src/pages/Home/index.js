import React from 'react';
import Recipes from '../../content/Recipes'
import { useHistory } from "react-router-dom";
import { useAuthedAxios } from '../../hooks/useAuthedAxios'
const Home = () => {
	const history = useHistory();
	const [{ data: userData, loading: userLoading, error: userError }, { refetch: userRefetch }] = useAuthedAxios('/user');
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