import axios, { AxiosError, AxiosRequestConfig } from "axios";
import config from "../config/config";

class ApiService {
  private baseUrl: string;
  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || config.API_HOST;
  }

  async fetchData(endpoint: string, options: AxiosRequestConfig = {}) {
    try {
      const response = await axios({
        method: options.method || "GET",
        url: `${this.baseUrl}${endpoint}`,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          `API request failed: ${error.response?.status} - ${error.message}`,
        );
      } else if (error instanceof Error) {
        throw new Error(`Unknown error: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }

  fetchTopics() {
    return this.fetchData("/api/content/topics");
  }
}

const apiService = new ApiService();
export default apiService;
