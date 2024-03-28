import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "./apiConfig";

const getAllUser = async () => {
  const response = await axios.get(`${baseUrl}`);
  return response.data;
};
