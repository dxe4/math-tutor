import useFetch from "./useFetch";
import apiService from "../../services/api";
import { PowerOfTwoConvergenceResponse, TopicData } from "../../types/apiTypes";

import { useCallback } from "react";

const useFetchPowerOfTwoToTheTen = () => {
  const fetchNumbers = useCallback(() => {
    return apiService.fetchPowerOfTwoToTheTen();
  }, []);

  return useFetch<PowerOfTwoConvergenceResponse>(fetchNumbers);
};

export default useFetchPowerOfTwoToTheTen;
