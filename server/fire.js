import * as React from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';
import {API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDING_ID, APP_ID, MEASUREMENT_ID} from 'react-native-dotenv'

class FirebaseSDK extends React.Component {
  constructor(props) {
  	super(props);
    this._init();
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

  async logoutUser(success, reject) {
  	await firebase
  	.auth()
  	.signOut()
  	.then(success, reject);
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

  async updateUserAuthProfile(data, success, reject) {
  	await firebase
  	.auth()
  	.currentUser
  	.updateProfile(data)
  	.then(success, reject);
  } 

  async createUserDocument(uid, data) {
  	try {
  		/*Create user in firestore*/
  		await firebase.firestore().collection('users').doc(uid).set(data);
  	} catch(e) {
  		console.log(e);
  	}
  }

  async updateUserDocument(uid, data) {
  	/*Update user in firestore*/
  	try {
  		await firebase.firestore().collection('users').doc(uid).update(data);
  	} catch(e) {
  		console.log(e);
  	}
  }

  currentUser() {
    return firebase.auth().currentUser;
  }

  newTimestamp() {
  	return firebase.firestore.Timestamp.now();
  }
}

firebaseSDK = new FirebaseSDK();
export default firebaseSDK