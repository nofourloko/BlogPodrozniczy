const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

var serviceAccount = require("./path/to/serviceAccountKey.json");


const app = initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'gs://mamablog-a2679.appspot.com'
});

const db = getFirestore();

async function getEntry(id = "", value = "", col = 'BlogEntries'){
    try{
        const blogEntryRef = await db.collection(col)
        let snapshot = ""

        if(id !== ""){
            snapshot = await blogEntryRef.where(id, '==', value).get()
        }else{
            snapshot = await blogEntryRef.get();
        }
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

async function getCountriesList(){
    try{
        const blogEntryRef = await db.collection('BlogEntries')
        const snapshot = await blogEntryRef.get();
        let result = []

        snapshot.forEach(doc => {
            let country = doc.data().Country
            if(!result.includes(country)){
                result.push(country)
            }
        })

        return result
    }catch(err){
        console.log(err)
        return err
    }
}

async function addNewPost(postObj){
    try{
        const res = await db.collection('BlogEntries').doc(postObj.id).set(postObj)
        return res

    }catch(err){
        console.log(err)
        throw new Error("blad dodania posta: " + err)
    }

}

module.exports = {
    getEntry,
    UpdateComments, 
    getCountriesList, 
    addNewPost
}