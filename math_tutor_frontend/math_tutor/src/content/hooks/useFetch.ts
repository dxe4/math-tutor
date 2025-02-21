import { useState, useEffect } from "react";
import apiService, { AxiosData } from "../../services/api";

function useFetch<T>(fetchFunction: () => Promise<AxiosData<T>>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const response = await fetchFunction();

      setData(response.data);
      setError(response.error);
      setIsLoading(response.isLoading);
    };

    fetchData();
  }, [fetchFunction]);

  return { data, isLoading, error };
}

export default useFetch;
