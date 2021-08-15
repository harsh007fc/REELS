import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'

firebase.initializeApp(
    {
        apiKey: "AIzaSyBFmPGDNraTh-mVCZ3Zd9fRKPYhRWKXRfk",
        authDomain: "stories-62e28.firebaseapp.com",
        projectId: "stories-62e28",
        storageBucket: "stories-62e28.appspot.com",
        messagingSenderId: "338968134184",
        appId: "1:338968134184:web:45a8d38109c8e6d5336b1d",
        measurementId: "G-LB02NKTPM3"
      }
)


export let auth = firebase.auth();
let firestore = firebase.firestore();
//saare firestore ka access ni dena hota bs jo use ayenge unka hi dena hota hai
export let database = {
    users:firestore.collection('users'),
    posts:firestore.collection('posts'),
    comments:firestore.collection('comments'),
    getCurrentTimeStamp:firebase.firestore.FieldValue.serverTimestamp
}
export let storage = firebase.storage();

// export default firebase;