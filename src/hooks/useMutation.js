import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

const mutationQuery = (mutationFn, mutationKey) => {
  return useMutation({
    mutationKey,
    mutationFn,
    onSuccess: (response) => {
      AsyncStorage.setItem("id_attendance", String(response.data.id));
    },
    onError: (error) => {},
  });
};
export default mutationQuery;
