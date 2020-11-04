import React, { useState } from 'react';
import axios from 'axios';
import RecipeCard from '../../uiComponents/RecipeCard';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useAuthedAxiosManual } from '../../hooks/useAuthedAxiosManual';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const Find = () => {
  const [recipeString, setRecipeString] = useState('');
  const [foundRecipes, setFoundRecipes] = useState([]);
  const [{ data, loading }, execute] = useAuthedAxiosManual({});

  const findRecipes = () => {
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    execute({
      url: `/find/${recipeString.replace(/\s/g, "-")}`,
      method: 'get',
    }).then(res => {
      console.log('res: ', res);
      setFoundRecipes(data.filter(recipe => recipe));
    }).catch(error => {
      console.error(error);
    })
  };

  const handleChange = e => {
    setRecipeString(e.target.value);
  }

  return (
    <div>
      <SearchContainer>
        <InputContainer>
          <TextField
            variant="outlined"
            id="recipeString"
            label="Recipe Name"
            name="recipeString"
            value={recipeString}
            onChange={handleChange}
            fullWidth
          />
        </InputContainer>
        <FindButton
          variant="contained"
          color="primary" onClick={findRecipes}>
          Find
        </FindButton>
      </SearchContainer>

      {loading && <LoadingContainer><span>Finding you some recipes</span><LinearProgress /></LoadingContainer>}
      <Grid container spacing={2}>
          {foundRecipes.map((recipe) => (
            <RecipeCard recipe={recipe} />
          ))}
        </Grid>
    </div>
  );
};

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`;

const FindButton = styled(Button)`
  height: 56px;
  width: 128px;
`;

const InputContainer = styled.div`
  margin-right: 16px;
  width: 333px;
`;


const LoadingContainer = styled.div`

`;
export default Find;
