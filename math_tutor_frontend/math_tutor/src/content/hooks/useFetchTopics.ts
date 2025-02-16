import useFetch from "./useFetch";
import apiService from "../../services/api";
import { TopicData } from "../../types/apiTypes";

import { useCallback } from "react";

const useFetchTopics = () => {
  const fetchTopics = useCallback(() => {
    return apiService.fetchTopics();
  }, []);

  return useFetch<TopicData[]>(fetchTopics);
};

export default useFetchTopics;
