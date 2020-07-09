import React, { createContext, useState } from 'react';
import firebaseSDK from '../server/fire';
import firebase from 'firebase';
import * as geofirex from 'geofirex';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [ userMatches, setUserMatches ] = React.useState(new Set([]));
  const [currentUserDocument, setCurrentUserDocument] = useState(null);

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
  const geo = geofirex.init(firebase);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        currentUserDocument,
        userMatches,
        setUserMatches,
        firebase,
        geo,
        setCurrentUserDocument,
        login: firebaseSDK.loginUser,
        register: firebaseSDK.registerUser,
        logout: firebaseSDK.logoutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};