// TokenContext.js

import React, { createContext, useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const storeToken = async (value) => {
    try {
      await AsyncStorage.setItem("Token", value);
    } catch (error) {
      console.error("Error storing token:", error);
    }
  };

  const retrieveToken = async () => {
    try {
      const value = await AsyncStorage.getItem("Token");
      if (value !== null) {
        setToken(value);
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };

  // Memanggil retrieveToken saat context provider pertama kali di-load
  useEffect(() => {
    retrieveToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, storeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useToken = () => useContext(AuthContext);
