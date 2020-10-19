import React, { useState } from 'react';
import useAxios from 'axios-hooks';
import axios from 'axios';
const Find = () => {
    const [recipeString, setRecipeString] = useState('');
    const [foundRecipes, setFoundRecipes] = useState([]);



    const findRecipes = () => {
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };
        console.log(recipeString);
        axios({
            url: `/find/${recipeString}`,
            method: 'get',
        })
            .then(res => {
                console.log('res: ', res);
                setFoundRecipes(res.data.filter(recipe => recipe))
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return <div>
        <input value={recipeString} onChange={e => setRecipeString(e.target.value)} />
        <button onClick={findRecipes}>Find</button>
        {foundRecipes.map(recipe => {
            return <div>Name: {recipe.name}</div>
        })}
    </div>


}

export default Find;