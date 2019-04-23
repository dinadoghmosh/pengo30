import firebase from 'firebase/app'


import 'firebase/firestore'


const config = {
  apiKey: "AIzaSyDlXbaj03MTuNiARKy9PRyaCSE36EBV1tY",
  authDomain: "bengo-e5a16.firebaseapp.com",
  databaseURL: "https://bengo-e5a16.firebaseio.com",
  projectId: "bengo-e5a16",
  storageBucket: "bengo-e5a16.appspot.com",
  messagingSenderId: "801687125933"
};
firebase.initializeApp(config);
const db = firebase.database();
export default db