import axios from "axios";
import { baseUrl } from "./apiConfig";

export const CreateIzinCuti = async (data, token) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api-izin-cuti/create-izin`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Failed to post data:", error);
    throw new Error(error);
  }
};

export const getIzinCuti = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api-izin-cuti/data-izin
    `);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateIzinCuti = async (id, data) => {
  try {
    const response = await axios.put(
      `${baseUrl}/api-izin-cuti/edit-izin/${id}`,
      data, // Send newData directly
      {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteIzinCuti = async (id, token) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/api-izin-cuti/delete-izin/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
