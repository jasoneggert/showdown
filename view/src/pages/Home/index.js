import React, { useState } from 'react';
import Recipes from '../../content/Recipes';
import Find from '../../content/Find';
import DeathMatches from '../../content/DeathMatches';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Home = ({ userDetails }) => {
  let { view } = useParams();
  const history = useHistory();
  const [currentView, setCurrentView] = useState(view ? view : 'recipes');
  const setView = e => {
    const view = e.target.value
    history.push(`/app/${view}`);
    setCurrentView(view);
  }
  return (
    <React.Fragment>
      <NavContainer>
        <button onClick={setView} value='recipes'>Recipes</button>
        <button onClick={setView} value='deathmatches'>DeathMatches</button>
        <button onClick={setView} value='find'>Find</button>
      </NavContainer>
      <ContentContainer>
        <ContentColumn>
          {currentView === 'recipes' && <Recipes />}
          {currentView === 'deathmatches' && <DeathMatches />}
          {currentView === 'find' && <Find />}
        </ContentColumn>
      </ContentContainer>
    </React.Fragment>
  );
};

const ContentContainer = styled.div`
  padding: 24px;
  width: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ContentColumn = styled.div`
  max-width: 80vw;
  width: 80vw;
`;

const NavContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 80px;
  font-weight: 500;
  font-family: 'Commissioner', sans-serif;
  top: -16px;
  position: relative;
`;

export default Home;
