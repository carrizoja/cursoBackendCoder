/* import admin from 'firebase-admin';
import account from './llavefirebase.json' assert { type: "json" }; */
const admin = require('firebase-admin');
const account = require('./llavefirebase.json');


console.log(account);
admin.initializeApp({
    credential: admin.credential.cert(account),
    databaseURL: "https://ecommercepbcoder.firebaseio.com"

})

const CRUD = async() => {
    const db = admin.firestore();
    const collection = db.collection('usuarios');

    // Insert One

    /* let doc = collection.doc();
    await doc.create({ nombre: "Chantel", dni: 34123456 })
    let batch = db.batch(); */

    // Insert Many

    /* let multipleUsers = [
        { name: "Mauricio", dni: 4352352 },
        { name: "Marisol", dni: 4352352 },
        { name: "Lila", dni: 4352352 },
        { name: "Edgar", dni: 4352352 },
        { name: "Mario", dni: 4352352 }
    ]
    multipleUsers.forEach(doc => {
        let refDoc = collection.doc();
        batch.set(refDoc, doc);
    })
    await batch.commit(); */

    // Get

    /*  const snapShot = await collection.get();
     let docs = snapShot.docs;
     console.log(docs);
     let users = docs.map(doc =>({
         id:doc.id,
         name:doc.data().name,
         dni:doc.data().dni
     }))
     console.log(users); */

    // Update 

    /*   let id = "qCjkAt6Dcc0lEtF5RyVj";
      const doc = collection.doc(id);
      let result = await doc.update({ dni: 0000000 });
      console.log(result); */

    // Delete

    let id = "qCjkAt6Dcc0lEtF5RyVj";
    const doc = collection.doc(id);
    let result = await doc.delete();
    console.log(result);

}
CRUD();