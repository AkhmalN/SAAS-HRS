// hooks/useDynamicQuery.js
import { useQuery } from "@tanstack/react-query";
import { useId } from "../context/userContext";
import { useToken } from "../context/authContext";

const useQueryId = (queryKey, queryFn) => {
  const { id } = useId();
  const { token } = useToken();
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => queryFn(id, token),
  });
};

export default useQueryId;
