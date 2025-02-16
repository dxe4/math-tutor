import useFetch from "./useFetch";
import apiService from "../../services/api";
import { Curve } from "../../types/apiTypes";

import { useCallback } from "react";

const useFetchCurves = () => {
  const fetchCurves = useCallback(() => {
    return apiService.fetchCurves();
  }, []);

  return useFetch<Curve[]>(fetchCurves);
};

export default useFetchCurves;
