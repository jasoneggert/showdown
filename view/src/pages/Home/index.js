import React , {useState} from 'react';
import Header from '../../uiComponents/Header'

import Recipes from '../../content/Recipes'
import Find from '../../content/Find';
import DeathMatches from '../../content/DeathMatches'
import { useAuthedAxios } from '../../hooks/useAuthedAxios';
import { useHistory } from "react-router-dom";
import { useParams} from "react-router";
import { authMiddleWare } from '../../util/auth';

const Home = ({ userDetails }) => {
	const history = useHistory();
	authMiddleWare(history);
	let { view } = useParams();
	console.log('view: ', view);
	const [currentView, setCurrentView] = useState(view);
	const [{ data: userData, loading: userLoading, error: userError }, { refetch: userRefetch }] = useAuthedAxios('/user');

	if (userLoading) {
		return <div>Loading..</div>
	}

	if (userError ) {
		console.log('error');
		history.push('/login')
	}
	console.log('match: ', history);
	return <React.Fragment>
		<Header title={'Recipe DeathMatch'} />
		<div>
			{currentView === 'recipes' || !currentView && <Recipes />}
			{currentView === 'deathmatches' && <DeathMatches/>}
			{currentView === 'find' && <Find />}

			
		</div>
	</React.Fragment>
}

export default Home;