import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import Recipes from '../../content/Recipes';
import Find from '../../content/Find';
import DeathMatches from '../../content/DeathMatches';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
;
const Home = ({ userDetails }) => {
  const history = useHistory();
  let { view } = useParams();
  const [currentView, setCurrentView] = useState(view ? view : 'recipes');
  const setView = view => {
    history.push(`/app/${view}`);
    setCurrentView(view);
  }

  return (
    <React.Fragment>
      <ContentContainer>
        <ContentColumn>
          <NavContainer>
            <VaporButton onClick={e => setView('recipes')}>Recipes</VaporButton>
            <VaporButton onClick={e => setView('deathmatches')}>DeathMatches</VaporButton>
            <VaporButton onClick={e => setView('find')}>Find</VaporButton>
          </NavContainer>
        </ContentColumn>
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
  width:100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  font-weight: 500;
  font-family: 'Commissioner', sans-serif;
`;

const VaporButton = styled.button`
  background: linear-gradient(45deg, #3f51b5 50%, #ff71ce 95%);
  border: 0;
  border-radius:12px;
  box-shadow: 0 3px 5px 2px #01cdfe;
  color: #fff;
  font-weight: bold;
  height: 24px;
  padding: 0 16px;
  cursor: pointer;
  margin: 0 16px;

  &:hover {
    box-shadow: 0 7px 5px 2px #ff71ce;
  }
`;

export default Home;
