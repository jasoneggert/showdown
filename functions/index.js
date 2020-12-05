const functions = require('firebase-functions');
const app = require('express')();
const auth = require('./util/auth');
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
const {
  loginUser,
  signUpUser,
  uploadProfilePhoto,
  getUserDetail,
  updateUserDetail,
} = require('./APIs/users');

const {
  getAllRecipesByUser,
  getRecipe,
  postOneRecipe,
  deleteRecipe,
  editRecipe,
} = require('./APIs/recipes');

const {
  getAllDeathMatches,
  postOneDeathMatch,
  deleteDeathMatch,
} = require('./APIs/deathMatches');

const { findRecipes } = require('./APIs/scraper');

// Users
app.post('/login', loginUser);
app.post('/signup', signUpUser);
app.post('/user/image', auth, uploadProfilePhoto);
app.get('/user', auth, getUserDetail);

//recipe routes
app.post('/recipes', auth, getAllRecipesByUser);
app.get('recipe', auth, getRecipe);
app.post('/createRecipe', auth, postOneRecipe);
app.delete('/recipe/:recipeId', auth, deleteRecipe);
app.put('/recipe/:recipeId', auth, editRecipe);

//deathMatch Routes
app.get('/deathMatches', auth, getAllRecipesByUser);

// app.post('/createDeathMatch', auth, postOneDeathMatch);
// app.delete('/deathMatch/:deathMatchId',auth, deleteDeathMatch);
// app.put('/deathMatch/:deathMatchId', auth, editRecipe);

//scraper
app.get('/find/:recipeString', auth, findRecipes);

exports.api = functions.https.onRequest(app);
