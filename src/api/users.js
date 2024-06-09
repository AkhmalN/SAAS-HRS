import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "./config";

const getAllUser = async () => {
  const response = await axios.get(`${baseUrl}`);
  return response.data;
};
