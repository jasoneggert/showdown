import React, { useState } from "react";
import { useParams } from "react-router";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Recipes from "../../content/Recipes";
import CreateRecipe from "../../content/CreateRecipe";
import Find from "../../content/Find";
import DeathMatches from "../../content/DeathMatches";
import styled from "styled-components";
import { useAuthedAxios } from "../../hooks/useAuthedAxios";
const Home = ({ userDetails }) => {
  const history = useHistory();
  let { view } = useParams();
  const [currentView, setCurrentView] = useState(view ? view : "recipes");

  const [
    { data: userData, loading: userLoading, error: userError },
  ] = useAuthedAxios(`/user`);

  if (userLoading) {
    return <div>Loading..</div>;
  }

  if (userError) {
    console.log("error");
  }

  const setView = (view) => {
    history.push(`/app/${view}`);
    setCurrentView(view);
  };

  return (
    <React.Fragment>
      <ContentContainer>
        <NavContainer>
          <SubNavButton onClick={(e) => setView("recipes")}>
            Recipes
          </SubNavButton>
          <SubNavButton onClick={(e) => setView("deathmatches")}>
            DeathMatches
          </SubNavButton>
          <SubNavButton onClick={(e) => setView("find")}>Find</SubNavButton>
        </NavContainer>
        <ContentColumn>
          {/* {currentView === 'recipes' && <Recipes setView={setView} />}
          {currentView === 'createRecipe' && <CreateRecipe setView={setView} />}
          {currentView === 'deathmatches' && <DeathMatches />}
          {currentView === 'find' && <Find />} */}

          <Switch>
            <Route
              path="/app/recipes"
              children={(props) => <Recipes setView={setView} />}
            />
            <Route
              path="/app/createRecipe"
              children={(props) => <CreateRecipe setView={setView} />}
            />
            <Route exact path="/app/deathmatches" component={DeathMatches} />
            <Route exact path="/app/find" component={Find} />
          </Switch>
        </ContentColumn>
      </ContentContainer>
    </React.Fragment>
  );
};

const ContentContainer = styled.div`
  padding: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContentColumn = styled.div`
  width: 57vw;
`;

const NavContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  font-weight: 500;
  top: -55px;
  left: 40px;
  position: relative;
`;

const SubNavButton = styled.button`
  background: #000;
  border: 0;
  border-radius: 12px;
  color: #fff;
  font-weight: bold;
  height: 24px;
  padding: 0 16px;
  cursor: pointer;
  margin: 0 16px;
  font-family: "Raleway", sans-serif;
  letter-spacing: 1px;
`;

export default Home;
