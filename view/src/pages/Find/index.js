import React, {useState} from 'react';
import { useAuthedAxios} from '../../hooks/useAuthedAxios';
import axios from 'axios';
const Find =() => {
    const [recipeString, setRecipeString] = useState(null);

    const findRecipes = () => {
       const  options = {
            url: '/find',
            method: 'get',
            data: {recipeName: recipeString}
        };
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };
        axios(options)
            .then(res => {
                console.log('res: ', res);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return <div><input value={recipeString} onChange={e => setRecipeString(e.targetvalue)}/>
    <button onClick={findRecipes}>Find</button>
    </div>
}

export default Find;