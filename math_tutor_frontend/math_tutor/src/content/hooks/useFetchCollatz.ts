import useFetch from "./useFetch";
import apiService from "../../services/api";
import { CollatzResponse } from "../../types/apiTypes";

import { useCallback } from "react";

const useFetchCollatz = (start: number, end: number) => {
  const fetchCollatz = useCallback(() => {
    return apiService.fetchCollatz(start, end);
  }, [start, end]);

  return useFetch<CollatzResponse[]>(fetchCollatz);
};

export default useFetchCollatz;
