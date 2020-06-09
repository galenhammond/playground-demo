import React, { createContext, useState } from 'react';
import firebaseSDK from '../server/fire';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserDocument, setCurrentUserDocument] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        currentUserDocument,
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