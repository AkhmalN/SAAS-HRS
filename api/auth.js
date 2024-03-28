import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl } from "./apiConfig";

export const Auth = async (username, password) => {
  try {
    const response = await axios.post(
      `${baseUrl}/user/api/token`,
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
