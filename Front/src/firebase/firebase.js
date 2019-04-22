import firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyCYaTKjfam_qMXDnGfcdnBxScEq89VQtLk',
  authDomain: 'curious-sandbox-196209.firebaseapp.com',
  databaseURL: 'https://curious-sandbox-196209.firebaseio.com',
  projectId: 'curious-sandbox-196209',
  storageBucket: '',
  messagingSenderId: '1034032747860'
};

firebase.initializeApp(config);
const auth = firebase.auth();


const database = firebase.database();
export {
  auth,
  database
};