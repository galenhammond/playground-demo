import React, { createContext, useState } from 'react';
import firebaseSDK from '../server/fire';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: firebaseSDK.loginUser,
        register: firebaseSDK.registerUser,
        logout: firebaseSDK.logoutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};