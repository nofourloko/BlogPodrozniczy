const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

var serviceAccount = require("./path/to/serviceAccountKey.json");

const app = initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'gs://mamablog-a2679.appspot.com'
});

const db = getFirestore();


async function getBlogEntries(){
    try{
        const blogEntryRef = await db.collection('BlogEntries')
        const snapshot = await blogEntryRef.get();
        let result = []

        snapshot.forEach(async (doc) => {
            result.push(doc.data());
        });
        
        return result
    }catch(err){
        console.log(err)
        return err
    }
}

async function getSelectedBlogEntry(Place){
    try{
        const blogEntryRef = await db.collection('BlogEntries')
        const snapshot = await blogEntryRef.where('Place', '==', Place).get()
        console.log(snapshot)
        let result = []

        snapshot.forEach(doc => {
          result.push(doc.data());
        });
        
        return result
    }catch(err){
        console.log(err)
        return err
    }
}

async function UpdateComments(docId, value){
    try{
        const blogEntryDocRef = await db.collection('BlogEntries').doc(docId)
        await blogEntryDocRef.update({
            'Comments' : value
        })  
    }catch(err){
        console.log(err)
        return err
    }
}


module.exports = {getBlogEntries,getSelectedBlogEntry, UpdateComments}