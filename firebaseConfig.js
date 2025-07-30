import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3tQ13Ne1d_R1ysS3fKCU6kj8t21UNq24",
  authDomain: "projetoeureka-b6e50.firebaseapp.com",
  projectId: "projetoeureka-b6e50",
  storageBucket: "projetoeureka-b6e50.firebasestorage.app",
  messagingSenderId: "740511907146",
  appId: "1:740511907146:web:02bacfcca15ce2a99755b3"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export const database = firebase.firestore()
export const auth = firebase.auth()