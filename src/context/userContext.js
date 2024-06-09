// TokenContext.js

import React, { createContext, useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [id, setId] = useState(1);

  const storeID = async (value) => {
    try {
      await AsyncStorage.setItem("ID_User", value);
    } catch (error) {
      console.error("Error storing id user:", error);
    }
  };

  const retrieveID = async () => {
    try {
      const value = await AsyncStorage.getItem("ID_User");
      if (value !== null) {
        setId(value);
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };

  // Memanggil retrieveID saat context provider pertama kali di-load
  useEffect(() => {
    retrieveID();
  }, []);

  return (
    <UserContext.Provider value={{ id, setId, storeID }}>
      {children}
    </UserContext.Provider>
  );
};

export const useId = () => useContext(UserContext);
