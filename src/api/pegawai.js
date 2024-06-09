import axios from "axios";
import { baseUrl } from "./config";

export const getPegawai = async (id, token) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api-employer/data-employer/${id}
      `,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getPegawaiAll = async (token) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api-employer/data-employer/
      `,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
