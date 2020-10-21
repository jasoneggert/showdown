const { db } = require('../util/admin');

const getAllDeathMatches = (request, response) => {
  db.collection('deathMatches')
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
      console.log('data: ', data);
      let deathMatches = [];
      data.forEach((doc) => {
        deathMatches.push({
          //deathMatch get schema
          name: doc.data().name,
          totalVotes: doc.data().votes.length,
          recipes: doc.data().recipes,
          startDate: doc.data().startDate,
        });
      });
      return response.json(deathMatches);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

const postOneDeathMatch = (request, response) => {
  if (request.body.name.trim() === '') {
    return response.status(400).json({ name: 'Must not be empty' });
  }

  const newDethMatchItem = {
    //deathmatch post schema
    name: request.body.name,
    recipeIds: request.body.recipeIds,
    votes: [],
    startDate: Date.now(),
  };
  db.collection('deathMatches')
    .add(newDethMatchItem)
    .then((doc) => {
      const responseDeatheMatchItem = newDeatheMatchItem;
      responseDeatheMatchItem.id = doc.id;
      return response.json(responseDeatheMatchItem);
    })
    .catch((err) => {
      response
        .status(500)
        .json({ error: 'Something went wrong creating deathatch' });
      console.error(err);
      return err;
    });
};

const deleteDeathMatch = (request, response) => {
  const document = db.doc(`/deathMatches/${request.params.deathMatchId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json({ error: 'DeathMatch not found' });
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

const voteOnDeathhMatch = (request, response) => {
  if (request.body.recipeId || request.body.createdAt) {
    response.status(403).json({ message: 'Not allowed to edit' });
  }
  let document = db
    .collection('deathMatches')
    .doc(`${request.params.recipeId}`);
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

const addRecipeToDeathMatch = (request, response) => {
  if (request.body.recipeId || request.body.createdAt) {
    response.status(403).json({ message: 'Not allowed to edit' });
  }
  let document = db
    .collection('deathMatches')
    .doc(`${request.params.recipeId}`);
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
  getAllDeathMatches,
  postOneDeathMatch,
  deleteDeathMatch,
  voteOnDeathhMatch,
  addRecipeToDeathMatch,
};
