import axios from "axios";
import { baseUrl } from "./apiConfig";

export const CreateDeduction = async (data) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api-debts-deductions/create-deduction`,
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
export const getDeduction = async () => {
  try {
    const response =
      await axios.get(`${baseUrl}/api-debts-deductions/data-deduction
      `);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
export const updateDeduction = async (id, data) => {
  try {
    const response = await axios.put(
      `${baseUrl}/api-debts-deductions/edit-deduction/${id}`,
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

export const deleteDeduction = async (id) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/api-debts-deductions/delete-deduction/${id}`,
      {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
      }
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
