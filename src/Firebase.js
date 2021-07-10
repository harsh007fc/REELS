import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'

firebase.initializeApp(
    {
        apiKey: "AIzaSyBTB3eAxKeiEHJ6hY3RiSpK8Mh_x8tFvKg",
        authDomain: "reels-42617.firebaseapp.com",
        projectId: "reels-42617",
        storageBucket: "reels-42617.appspot.com",
        messagingSenderId: "135168045751",
        appId: "1:135168045751:web:86e0719c452c53e3db9332"
      }
)


export let auth = firebase.auth();
let firestore = firebase.firestore();
//saare firestore ka access ni dena hota bs jo use ayenge unka hi dena hota hai
export let database = {
    user:firestore.collection('user'),
    getCurrentTimeStamp:firebase.firestore.FieldValue.serverTimestamp
}
export let storage = firebase.storage();

// export default firebase;