const { db } = require('../util/admin');

const getAllRecipesByUser = async (request, response) => {
  const userName = request.user.username;
  const lastItem = request.body.lastItem;
  const firstItem = request.body.firstItem;
  const pageNext = request.body.pageNext;
  const pagePrev = request.body.pagePrev;
  const defaulImageFallBacks = ['https://firebasestorage.googleapis.com/v0/b/showdown-771b8.appspot.com/o/veg.png?alt=media&token=7723f15b-6cb8-4cc4-aa10-1517f6586d77',
    'https://firebasestorage.googleapis.com/v0/b/showdown-771b8.appspot.com/o/cooking1.png?alt=media&token=051c5a47-f54a-4279-9971-c57b725bf80f',
    'https://firebasestorage.googleapis.com/v0/b/showdown-771b8.appspot.com/o/cooking1.png?alt=media&token=051c5a47-f54a-4279-9971-c57b725bf80f',
    'https://firebasestorage.googleapis.com/v0/b/showdown-771b8.appspot.com/o/cooking3.png?alt=media&token=6f922326-9cfc-40b0-a785-f3b0f860122d'];

  const allRecipes = db.collection("recipes")
    .where('username', '==', userName)
    .orderBy('name');

  var first = allRecipes
    .limit(8);
  let paginationOption = first;

  if (lastItem && pageNext) {
    const next = allRecipes
      .startAfter(lastItem)
      .limit(8);
    paginationOption = next;

  }

  if (firstItem && pagePrev) {
    const prev = allRecipes
      .endBefore(firstItem)
      .limit(8);
    paginationOption = prev;
  }

  const snapshot = await paginationOption.get();
  const newFirstItem = snapshot.docs[0].data().name;
  const newLastItem = snapshot.docs[snapshot.docs.length - 1].data().name;

  await paginationOption
    .get()
    .then((data) => {
      let recipes = [];
      data.forEach((doc) => {
        recipes.push({
          recipeId: doc.id,
          website: doc.data().website ? doc.data().website : 'USER_CREATED',
          name: doc.data().name,
          body: doc.data().body,
          ingredients: doc.data().ingredients,
          prep: doc.data().prep,
          image: doc.data().image ? doc.data().image : defaulImageFallBacks[Math.floor(Math.random() * defaulImageFallBacks.length)],
          deathMatches: doc.data().deathMatches,
          createdAt: doc.data().createdAt,
        });
      });

      return response.json({ recipes, firstItem: newFirstItem, lastItem: newLastItem });

    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

const getRecipe = (request, response) => {
  db.doc(`/recipes/${request.params.recipeId}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        recipe = doc.data();
        return response.json(recipe);
      }
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({
        error: err.code,
      });
    });
};

const postOneRecipe = (request, response) => {
  if (request.body.name.trim() === '') {
    return response.status(400).json({ title: 'Must not be empty' });
  }

  const newRecipeItem = {
    name: request.body.name,
    prep: request.body.prep ? request.body.prep : [],
    ingredients: request.body.ingredients ? request.body.ingredients : [],
    deathMatches: request.body.deathMatches ? request.body.deathMatches : [],
    username: request.user.username,
    servings: request.body.servings,
    image: request.body.image,
    time: {
      prep: request.body.time.prep,
      cook: request.body.time.cook,
      active: request.body.time.active,
      inactive: request.body.time.inactive,
      ready: request.body.time.ready,
      total: request.body.time.total,
    },
    createdAt: Date.now(),
  };
  db.collection('recipes')
    .add(newRecipeItem)
    .then((doc) => {
      const responseRecipeItem = newRecipeItem;
      responseRecipeItem.id = doc.id;
      return response.json(responseRecipeItem);
    })
    .catch((err) => {
      response
        .status(500)
        .json({ error: 'Something went wrong creating recipe' });
      console.error(err);
      return err;
    });
};

const deleteRecipe = (request, response) => {
  const document = db.doc(`/recipes/${request.params.recipeId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json({ error: 'Recipe not found' });
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

const editRecipe = (request, response) => {
  if (request.body.recipeId || request.body.createdAt) {
    response.status(403).json({ message: 'Not allowed to edit' });
  }
  let document = db.collection('recipes').doc(`${request.params.recipeId}`);
  document
    .update(request.body)
    .then(() => {
      return response.json({ message: 'Updated successfully' });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({
        error: err.code,
      });
    });
};

module.exports = {
  getAllRecipesByUser,
  getRecipe,
  postOneRecipe,
  editRecipe,
  deleteRecipe,
};
