import React, { useState } from 'react';
import axios from 'axios';
import RecipeCard from '../../uiComponents/RecipeCard';
import Grid from '@material-ui/core/Grid';
import { useAuthedAxiosManual } from '../../hooks/useAuthedAxiosManual';
const Find = () => {
  const [recipeString, setRecipeString] = useState('');
  const [foundRecipes, setFoundRecipes] = useState([]);
  const [showLoadingMessage, setShowLoadingMessage] = useState(false)
  const [{ data, loading, error }, execute] = useAuthedAxiosManual({});

  const findRecipes = () => {
    setShowLoadingMessage(true)
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    execute({
      url: `/find/${recipeString}`,
      method: 'get',
    }).then (res => {
      console.log('res: ', res);
      setFoundRecipes(res.data.filter(recipe => recipe));
      setShowLoadingMessage(false)
    })
  };
  return (
    <div>
      <input
        value={recipeString}
        onChange={(e) => setRecipeString(e.target.value)}
      />
      <button onClick={findRecipes}>Find</button>
      {loading && <div>Finding you some recipes</div>}
      <Grid container spacing={2}>
        {foundRecipes.map((recipe) => (
          <RecipeCard recipe={recipe} />
        ))}
      </Grid>
    </div>
  );
};

export default Find;
