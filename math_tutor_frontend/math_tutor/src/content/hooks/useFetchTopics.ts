import { useState, useEffect } from "react";
import apiService from "../../services/api";
import { TopicData } from "../../types/apiTypes";

const useFetchTopics = () => {
  const [data, setData] = useState<TopicData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await apiService.fetchTopics();
        setData(response);
        setError(null);
      } catch (err) {
        setError("Failed to load data");
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};

export default useFetchTopics;
