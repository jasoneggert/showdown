import React, { useState } from 'react';
import Recipes from '../../content/Recipes'
import Find from '../../content/Find';
import DeathMatches from '../../content/DeathMatches'
import { useAuthedAxios } from '../../hooks/useAuthedAxios';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { authMiddleWare } from '../../util/auth';
import styled from 'styled-components';

const Home = ({ userDetails }) => {
	const history = useHistory();
	authMiddleWare(history);
	let { view } = useParams();
	const [currentView, setCurrentView] = useState(view);
	const [{ data: userData, loading: userLoading, error: userError }, { refetch: userRefetch }] = useAuthedAxios('/user');

	if (userLoading) {
		return <div>Loading..</div>
	}

	if (userError) {
		console.log('error');
		history.push('/login')
	}
	console.log('currentView: ', currentView);

	console.log('match: ', history);
	return <React.Fragment>
		<ContentContainer>
			<ContentColumn>
				{currentView === 'recipes' && <Recipes />}
				{currentView === 'deathmatches' && <DeathMatches />}
				{currentView === 'find' && <Find />}
			</ContentColumn>
		</ContentContainer>
	</React.Fragment>
}

const ContentContainer = styled.div`
	padding: 24px;
	width: 100;
	display: flex;
	flex-direction: column;
	align-items: center;
    justify-content: center;

`;
const ContentColumn = styled.div`
	max-width: 750px;
`;

export default Home;