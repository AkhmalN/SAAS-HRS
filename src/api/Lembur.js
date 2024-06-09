import axios from "axios";
import { baseUrl } from "./config";
export const CreateLembur = async (data, token) => {
  try {
    console.log({ data, token });

    const response = await axios.post(`${baseUrl}/lembur/create-lembur`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Perhatikan penggunaan "Bearer"
      },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const GetDataLembur = async (token) => {
  try {
    const response = await axios.get(
      `${baseUrl}/lembur/data-lembur
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
