import React, { useState, useEffect } from 'react';
import { useTrail, animated } from 'react-spring';
import { useAuthedAxiosManual } from '../../hooks/useAuthedAxiosManual';
import RecipeCard from '../../uiComponents/RecipeCard';
import RecipeDetail from '../../uiComponents/RecipeDetail'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { baseApiUrl } from '../../util/baseApiUrl';
const Recipes = () => {

  const history = useHistory();
  const [viewedRecipe, setViewedRecipe] = useState(false);
  const [fistCalled, setFirstCalled] = useState([]);


  const [{ data: recipesData, loading: recipesLoading, error: recipesError }, execute] = useAuthedAxiosManual({});

  useEffect(() => {
    if (fistCalled) {
      setFirstCalled(true)
      execute({ url: baseApiUrl() + '/recipes', method: 'post', data: { first: true } });
    }
  }, [execute]);

  const trail = useTrail(recipesData && recipesData.recipes ? recipesData.recipes.length : [], {
    from: { marginLeft: -20, opacity: 0, transform: 'scale(0)' },
    to: { marginLeft: 0, opacity: 1, transform: 'scale(1)' }
  });


  if (recipesLoading) {
    return <div>Loading...</div>;
  }
  if (recipesError) {
    history.push('../login');
  }

  const openView = recipe => {
    setViewedRecipe(recipe);
  }

  const closeView = () => {
    setViewedRecipe(false);
  }


  const nextPage = () => {
    execute({ url: baseApiUrl() + '/recipes', method: 'post', data: { first: false, pageNext: true, pagePrev: false, firstItem: recipesData.firstItem, lastItem: recipesData.lastItem } })
  }

  const prevPage = () => {
    execute({ url: baseApiUrl() + '/recipes', method: 'post', data: { first: false, pageNext: false, pagePrev: true, firstItem: recipesData.firstItem, lastItem: recipesData.lastItem } })

  }

  return (
    <React.Fragment>
      <RecipeDetail recipe={viewedRecipe} handleClose={closeView} />
      <Grid>
        {recipesData && trail.map((props, index) => (
          <AnimatedRecipeCard
            key={recipesData.recipes[index].recipeId}
            style={props}
          >
            <RecipeCard key={recipesData.recipes[index].id} recipe={recipesData.recipes[index]} openView={openView} />
          </AnimatedRecipeCard>
        ))}
      </Grid>
      <button onClick={prevPage}>Previous</button>
      <button onClick={nextPage}>Next</button>

    </React.Fragment>

  );
};


const AnimatedRecipeCard = styled(animated.div)`
  width: 100%;
  min-height: 330px;
  margin: 12px 0;
  box-shadow: -3px 5px 15px 0px #888888;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
export default Recipes;
