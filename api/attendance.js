import axios from "axios";
import { baseUrl } from "./apiConfig";

export const CreateDeduction = async (data) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api-attendance/create-attendance`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Failed to post data:", error);
    throw new Error(error);
  }
};
