import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGL5BMk88xStfOCOrG9_l41V78YdTAj2o",
  authDomain: "prreelsclone.firebaseapp.com",
  projectId: "prreelsclone",
  storageBucket: "prreelsclone.appspot.com",
  messagingSenderId: "859716349144",
  appId: "1:859716349144:web:a980ff0349eaa9f5a1bbad"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const firestore = firebase.firestore();
export const database = {
    users : firestore.collection('users'),
    getTimeStamp : firebase.firestore.FieldValue.serverTimestamp,
}

export const storage = firebase.storage()