import axios from "axios";
import { baseUrl } from "./config";

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
    if (error.response) {
      let errorMessage;
      // The client was given an error response (5xx, 4xx)

      if (error.response.status === 422) {
        errorMessage = "Username & Password harus diisi";
      }
      if (error.response.status === 400) {
        errorMessage = "Username atau Password salah";
      }
      throw new Error(errorMessage);

      // console.log(error.response.status);
    }
  }
};
