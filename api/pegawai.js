import axios from "axios";
import { baseUrl } from "./apiConfig";

export const getPegawai = async (id) => {
  try {
    const response =
      await axios.get(`${baseUrl}/api-employer/data-employer/${id}
      `);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
