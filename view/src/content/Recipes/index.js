import React from 'react';
import axios from 'axios';
import { authMiddleWare } from '../../util/auth';
import { useHistory } from "react-router-dom";
import useAxios from 'axios-hooks'
import { useAuthedAxios } from '../../hooks/useAuthedAxios';

const Recipes = () => {
    const [{ data: recipesData, loading: recipesLoading, error: recipesError }, { refetch: recipeRefetch }] = useAuthedAxios('/recipes');
    console.log('recipesData: ', recipesData);
    if (recipesLoading) {
        return <div>Loading...</div>
    }
    if (recipesError) {
        return <div>There Was Error Loading Your Reecipes</div>
    }
    return <div>
        {recipesData.map(recipe => <div>{recipe.name}</div>)}
    </div>

};

export default Recipes;