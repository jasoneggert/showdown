const functions = require('firebase-functions');
const app = require('express')();
const auth = require('./util/auth');

const {
    loginUser,
    signUpUser,
    uploadProfilePhoto,
    getUserDetail,
    updateUserDetail
} = require('./APIs/users')


const {
    getAllRecipes,
    getRecipe,
    postOneRecipe,
    deleteRecipe,
    editRecipe
} = require('./APIs/recipes');

const {
    getAllDeathMatches,
    postOneDeathMatch,
    deleteDeathMatch,
    editDeathMatch
} = require('./APIs/deathMatches');

const { findRecipes } = require('./APIs/scraper');

// Users
app.post('/login', loginUser);
app.post('/signup', signUpUser);
app.post('/user/image', auth, uploadProfilePhoto);
app.get('/user', auth, getUserDetail);

//recipe routes
app.get('/recipes',auth,  getAllRecipes);
app.get('recipe', auth , getRecipe)
app.post('/createRecipe', auth, postOneRecipe);
app.delete('/recipe/:recipeId',auth, deleteRecipe);
app.put('/recipe/:recipeId', auth, editRecipe);

//deathMatch Routes
app.get('/deathMatches',auth,  getAllRecipes);

app.post('/createDeathMatch', auth, postOneRecipe);
app.delete('/deathMatch/:deathMatchId',auth, deleteRecipe);
app.put('/deathMatch/:deathMatchId', auth, editRecipe);
app.get('/find', auth, findRecipes);

exports.api = functions.https.onRequest(app);
    