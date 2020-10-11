
const { db } = require('../util/admin');

exports.getAllRecipes = (request, response) => {
	db
		.collection('recipes')
        .orderBy('createdAt', 'desc')
        .where('username', '==', request.user.username)
		.get()
		.then((data) => {
            console.log('data: ', data);
			let recipes = [];
			data.forEach((doc) => {
				recipes.push({
                    recipeId: doc.id,
                    name: doc.data().name,
                    body: doc.data().body,
                    ingredients: doc.data().ingredients,
                    prep: doc.data().prep,
                    deathMatches: doc.data().deathMatches,
					createdAt: doc.data().createdAt,
				});
			});
			return response.json(recipes);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code});
		});
};

exports.postOneRecipe = (request, response) => {
	
    if(request.body.name.trim() === '') {
        return response.status(400).json({ title: 'Must not be empty' });
    }
    
    const newRecipeItem = {
        name: request.body.name,
        prep: request.body.prep ? request.body.prep : [],
        ingredients: request.body.ingredients ? request.body.ingredients : [],
        deathMatches: request.body.deathMatches ? request.body.deathMatches : [],
        username: request.user.username,
        createdAt: Date.now()
    }
    db
        .collection('recipes')
        .add(newRecipeItem)
        .then((doc)=>{
            const responseRecipeItem = newRecipeItem;
            responseRecipeItem.id = doc.id;
            return response.json(responseRecipeItem);
        })
        .catch((err) => {
			response.status(500).json({ error: 'Something went wrong' });
            console.error(err);
            return err;
		});
};

exports.deleteRecipe = (request, response) => {
    const document = db.doc(`/recipes/${request.params.recipeId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: 'Recipe not found' })
            }
            return document.delete();
        })
        .then(() => {
           return response.json({ message: 'Delete successfull' });
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        });
};

exports.editRecipe = ( request, response ) => { 
    if(request.body.recipeId || request.body.createdAt){
        response.status(403).json({message: 'Not allowed to edit'});
    }
    let document = db.collection('recipes').doc(`${request.params.recipeId}`);
    document.update(request.body)
    .then(()=> {
        return response.json({message: 'Updated successfully'});
    })
    .catch((err) => {
        console.error(err);
        return response.status(500).json({ 
                error: err.code 
        });
    });
};
