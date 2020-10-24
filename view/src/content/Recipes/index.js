import React from 'react';
import { useAuthedAxios } from '../../hooks/useAuthedAxios';
import RecipeCard from '../../uiComponents/RecipeCard';
import Grid from '@material-ui/core/Grid';

const Recipes = () => {
  const [
    { data: recipesData, loading: recipesLoading, error: recipesError },
    { refetch: recipeRefetch },
  ] = useAuthedAxios('/recipes');
  console.log('recipesData: ', recipesData);

  if (recipesLoading) {
    return <div>Loading...</div>;
  }
  if (recipesError) {
    return <div>There Was Error Loading Your Reecipes</div>;
  }
  return (
    <Grid container spacing={5}>
      {recipesData.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </Grid>
  );
};

export default Recipes;
