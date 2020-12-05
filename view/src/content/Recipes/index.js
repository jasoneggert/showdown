import React, { useState, useEffect } from 'react';
import { useTrail, animated } from 'react-spring';
import { useAuthedAxiosManual } from '../../hooks/useAuthedAxiosManual';
import RecipeCard from '../../uiComponents/RecipeCard';
import RecipeDetail from '../../uiComponents/RecipeDetail';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { baseApiUrl } from '../../util/baseApiUrl';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
const Recipes = ({ setView }) => {
  const pageItemCount = 8;

  const history = useHistory();
  const [viewedRecipe, setViewedRecipe] = useState(false);
  const [firstCalled, setFirstCalled] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const [
    { data: recipesData, loading: recipesLoading, error: recipesError },
    execute,
  ] = useAuthedAxiosManual({});

  useEffect(() => {
    if (firstCalled) {
      setFirstCalled(true);
      execute({
        url: baseApiUrl() + '/recipes',
        method: 'post',
        data: { first: true, pageItemCount },
      });
    }
  }, [execute]);
  const trail = useTrail(
    recipesData && recipesData.recipes ? recipesData.recipes.length : [],
    {
      from: { marginLeft: -20, opacity: 0, transform: 'scale(0)' },
      to: { marginLeft: 0, opacity: 1, transform: 'scale(1)' },
    }
  );

  if (recipesLoading) {
    return <div>Loading...</div>;
  }
  if (recipesError) {
    history.push('../login');
  }

  const openView = (recipe) => {
    setViewedRecipe(recipe);
  };

  const closeView = () => {
    setViewedRecipe(false);
  };

  const nextPage = () => {
    setPageNumber(pageNumber + 1);
    execute({
      url: baseApiUrl() + '/recipes',
      method: 'post',
      data: {
        first: false,
        pageNext: true,
        pagePrev: false,
        firstItem: recipesData.firstItem,
        lastItem: recipesData.lastItem,
        pageItemCount,
      },
    });
  };

  const prevPage = () => {
    setPageNumber(pageNumber - 1);
    execute({
      url: baseApiUrl() + '/recipes',
      method: 'post',
      data: {
        first: false,
        pageNext: false,
        pagePrev: true,
        firstItem: recipesData.firstItem,
        lastItem: recipesData.lastItem,
        pageItemCount,
      },
    });
  };

  return (
    <React.Fragment>
      <RecipeDetail recipe={viewedRecipe} handleClose={closeView} />
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setView('createRecipe')}
      >
        <AddIcon />
      </Fab>
      <Grid>
        {recipesData &&
          trail.map((props, index) => (
            <AnimatedRecipeCard
              key={recipesData.recipes[index].recipeId}
              style={props}
            >
              <RecipeCard
                key={recipesData.recipes[index].id}
                recipe={recipesData.recipes[index]}
                openView={openView}
              />
            </AnimatedRecipeCard>
          ))}
      </Grid>
      <PaginationContainer>
        <LeftButton>
          <Button disabled={pageNumber === 0} onClick={prevPage}>
            Previous
          </Button>
        </LeftButton>
        <RightButton>
          <Button disabled={trail.length < pageItemCount} onClick={nextPage}>
            Next
          </Button>
        </RightButton>
      </PaginationContainer>
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

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const LeftButton = styled.div``;
const RightButton = styled.div`
  margin-left: auto;
`;
export default Recipes;
