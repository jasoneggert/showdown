import React, { useState } from 'react';
import Recipes from '../../content/Recipes';
import Find from '../../content/Find';
import DeathMatches from '../../content/DeathMatches';
import { useParams } from 'react-router';
import styled from 'styled-components';

const Home = ({ userDetails }) => {
  let { view } = useParams();
  const [currentView, setCurrentView] = useState(view ? view : 'recipes');

  return (
    <React.Fragment>
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

export default Home;
