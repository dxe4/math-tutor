import useFetch from "./useFetch";
import apiService from "../../services/api";
import { Biography } from "../../types/apiTypes";

import { useCallback } from "react";

const useBios = () => {
  const fetchBios = useCallback(() => {
    return apiService.fetchBios();
  }, []);

  return useFetch<Biography[]>(fetchBios);
};

export default useBios;
