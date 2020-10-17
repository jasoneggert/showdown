import React from 'react';
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