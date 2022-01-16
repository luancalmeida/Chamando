import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyC4PN7ECu_3-GywYxIxzw3KC-_VpdL6tis",
    authDomain: "chamado-3d145.firebaseapp.com",
    projectId: "chamado-3d145",
    storageBucket: "chamado-3d145.appspot.com",
    messagingSenderId: "677619445227",
    appId: "1:677619445227:web:129d6a88e0eb12e33c7dae",
    measurementId: "G-5ZBR7R602J"
  };
  
  // Initialize Firebase
  if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
  }

 export default firebase;

  