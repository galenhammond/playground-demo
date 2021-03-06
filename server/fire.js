import * as React from 'react';
import * as geofirex from 'geofirex'; 
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
    this.geo = geofirex.init(firebase);
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

  async retrieveUserDocument(uid) {
  	await firebase.firestore().collection('users').doc(uid).get()
  	.then(doc => {
  		if (!doc.exists) return doc.exists;
  		return doc.data();
  	})

  }

  async createUserConversation(uid, uid2) {
    try {
      await firebase.firestore().collection('users').doc(uid).get()
      .then(async doc => {
        if (!doc.exists) await firebase.firestore().collection('conversations').doc(uid + '_' + uid2).set({lastMessage: '', messages: []});
      })
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

  async uploadUserImage(uid, imageUri) {
    try {
      const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = () => {
              resolve(xhr.response);
          };
          xhr.responseType = 'blob';
          xhr.open('GET', imageUri, true);
          xhr.send(null);
      });
      const ref = firebase
          .storage()
          .ref()
          .child(`userImages/${uid}/${this.uuidv4()}`);
      let snapshot = await ref.put(blob);
      return await snapshot.ref.getDownloadURL();
  } catch(e) {
    console.log(e)
    }
  }

  async sendMessage(origin_uid, destination_uid, timestamp, payload) {};

  async getUserQuery(collection, center, radius, field) {
    const geoRef = this.geo.query(collection);
    return await geoRef.within(center, radius, field);
  }

  getGeopoint(lat, long) {
    return this.geo.point(lat,long);
  }

  currentUser() {
    return firebase.auth().currentUser;
  }

  getTimestamp() {
  	return firebase.firestore.Timestamp.now();
  }

  uuidv4() {
  	return Math.random() * 16;
  }

}

firebaseSDK = new FirebaseSDK();
export default firebaseSDK