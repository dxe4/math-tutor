import axios, { AxiosRequestConfig, AxiosError } from "axios";
import config from "../config/config";
import {
  PrimeNumberResponse,
  Biography,
  Curve,
  TopicData,
} from "../types/apiTypes";

export interface AxiosResponseData<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || config.API_HOST;
  }

  private async axiosRequest<T>(
    endpoint: string,
    options: AxiosRequestConfig = {},
  ): Promise<AxiosResponseData<T>> {
    const response: AxiosResponseData<T> = {
      data: null,
      error: null,
      isLoading: true,
    };

    try {
      const result = await axios({
        method: options.method || "GET",
        url: `${this.baseUrl}${endpoint}`,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      response.data = result.data;
      response.error = null;
    } catch (err) {
      if (err instanceof AxiosError) {
        response.error = `API request failed: ${err.response?.status} - ${err.message}`;
      } else if (err instanceof Error) {
        response.error = `Unknown error: ${err.message}`;
      } else {
        response.error = "An unknown error occurred";
      }
    } finally {
      response.isLoading = false;
    }

    return response;
  }

  async fetchTopics(): Promise<AxiosResponseData<TopicData[]>> {
    return this.axiosRequest<TopicData[]>("/api/content/topics");
  }

  async fetchCurves(): Promise<AxiosResponseData<Curve[]>> {
    return this.axiosRequest<Curve[]>("/api/content/curves");
  }
  async fetchBios(): Promise<AxiosResponseData<Biography[]>> {
    return this.axiosRequest<Biography[]>("/api/content/biographies");
  }
  async fetchPrimes(
    start: number,
    end: number,
  ): Promise<AxiosResponseData<PrimeNumberResponse>> {
    const url = `/api/content/prime-check?start=${start}&end=${end}`;
    return this.axiosRequest<PrimeNumberResponse>(url);
  }
}

const apiService = new ApiService();
export default apiService;
