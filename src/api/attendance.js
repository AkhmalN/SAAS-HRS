import axios from "axios";
import { baseUrl } from "./config";

export const createAttendance = async (data, token) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api-attendance/create-attendance`,
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

export const getAttendance = async (id, token) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api-attendance/data-attendance/${id}`,
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
