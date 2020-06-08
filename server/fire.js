import * as React from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import {API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDING_ID, APP_ID, MEASUREMENT_ID} from 'react-native-dotenv'

class FirebaseSDK extends React.Component {
  constructor(props) {
  	super(props);
    this._init();
  }

  componentDidMount() {
  	firebase.auth().onAuthStateChanged(user => {
  		if (user) {
  			/* update react context to show user logged in */
  			console.log(user);
  		} else {
  			/* update react context to show user logged out */
  			console.log(user);
  		}
  	})
  }

  _init() {
  	if (!firebase.apps.length) {
	  	firebase.initializeApp({
		  	apiKey: API_KEY,
		    authDomain: AUTH_DOMAIN,
		    databaseURL: DATABASE_URL,
		    projectId: PROJECT_ID,
		    storageBucket: STORAGE_BUCKET,
		    messagingSenderId: MESSAGING_SENDING_ID,
		    appId: APP_ID,
		    measurementId: MEASUREMENT_ID
		});
	  }
  }

  async registerUser(user, success, reject) {
  	await firebase
  	.auth()
  	.createUserWithEmailAndPassword(user.email, user.password)
  	.then(success, reject);
  }

  async loginUser(user, success, reject) {
  	await firebase
  	.auth()
  	.signInWithEmailAndPassword(user.email, user.password)
  	.then(success, reject);
  }

  currentUser() {
    return firebase.auth().currentUser;
  }

}

firebaseSDK = new FirebaseSDK();
export default firebaseSDK