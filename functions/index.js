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
    postOneRecipe,
    deleteRecipe,
    editRecipe
} = require('./APIs/recipes');

// Users
app.post('/login', loginUser);
app.post('/signup', signUpUser);
app.post('/user/image', auth, uploadProfilePhoto);
app.get('/user', auth, getUserDetail);

//recipe routes
app.get('/recipes',auth,  getAllRecipes);
app.post('/recipe', auth, postOneRecipe);
app.delete('/recipe/:recipeId',auth, deleteRecipe);
app.put('/recipe/:recipeId', auth, editRecipe);

exports.api = functions.https.onRequest(app);

    