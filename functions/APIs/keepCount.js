const { db } = require('../util/admin');

exports.keepCount = functions.firestore
  .document('recipes/{recipeId}')
  .onCreate((snapshot, context) => {

    return db.runTransaction(async transaction => {

        // Get the metadata and incement the count.
        const metaRef = db.doc('metadata/recipes');
        console.log('metaRef: ', metaRef);
        const metaData = ( await transaction.get( metaRef ) ).data();
        console.log('metaData: ', metaData);

        const number = metaData.count + 1;

        transaction.update(metaRef, {
            count: number
        });

        // Update Customer
        const customerRef = snapshot.ref;

        transaction.set(customerRef, {
            number,
        },
         { merge: true }
        );


    });

  });
