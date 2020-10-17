import React , {useCallback, useState} from 'react';
import Recipes from '../../content/Recipes'
import Header from '../../uiComponents/Header'
import Find from '../Find';
import { useAuthedAxios } from '../../hooks/useAuthedAxios';
import { useHistory } from "react-router-dom";
import { useParams} from "react-router";

const Home = ({ userDetails }) => {
	const history = useHistory();
	let { view } = useParams();
	const [currentView, setCurrentView] = useState('recipes');
	const [{ data: userData, loading: userLoading, error: userError }, { refetch: userRefetch }] = useAuthedAxios('/user');
	

	if (userLoading) {
		return <div>Loading..</div>
	}

	if (userError) {
		console.log('error');
		history.push('./login')
	}
	console.log('match: ', history);
	const updateView = useCallback(() => setCurrentView(view), [view])
	return <React.Fragment>
		<Header title={'Recipe DeathMatch'} />
		<div>
			{currentView === 'recipes' && <Recipes />}
			{currentView === 'find' && <Find />}

			
		</div>
	</React.Fragment>
}

export default Home;