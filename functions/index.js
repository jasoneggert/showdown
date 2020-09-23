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
    getAllTodos,
    postOneTodo,
    deleteTodo,
    editTodo
} = require('./APIs/todos');

// Users
app.post('/login', loginUser);
app.post('/signup', signUpUser);
app.post('/user/image', auth, uploadProfilePhoto);
app.get('/user', auth, getUserDetail);
app.get('/todos',auth,  getAllTodos);
app.post('/todo', auth, postOneTodo);
app.delete('/todo/:todoId',auth, deleteTodo);
app.put('/todo/:todoId', auth, editTodo);

exports.api = functions.https.onRequest(app);

    