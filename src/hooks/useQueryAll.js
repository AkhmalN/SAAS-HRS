// hooks/useDynamicQuery.js
import { useQuery } from "@tanstack/react-query";
import { useToken } from "../context/authContext";

const useQueryAll = (queryKey, queryFn) => {
  const { token } = useToken();
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => queryFn(token),
  });
};

export default useQueryAll;
