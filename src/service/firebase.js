import * as firebase from 'firebase';

 var config = {
  apiKey: "AIzaSyA2aWhmtwcW-HJ80tYyv1Hs2A9MRzY3acQ",
  authDomain: "videoconference-bf935.firebaseapp.com",
  databaseURL: "https://videoconference-bf935.firebaseio.com",
  projectId: "videoconference-bf935",
  storageBucket: "videoconference-bf935.appspot.com",
  messagingSenderId: "895553387250"
};
firebase.initializeApp(config);

export default firebase;