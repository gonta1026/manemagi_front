import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import Auth from './Auth';

export type NormalizeError = {
  status: number;
  message: string;
  statusText: string;
  raw: any;
};

class APIClient {
  private readonly axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.API_URL,
      // withCredentials: true
    });

    this.axiosInstance.interceptors.request.use(
      function (config: AxiosRequestConfig) {
        const auth = new Auth();
        const loginedKeys = auth.getLoginedStorageKeys();
        if (loginedKeys?.accessToken && loginedKeys?.client && loginedKeys?.uid) {
          config.headers['access-token'] = loginedKeys?.accessToken;
          config.headers['client'] = loginedKeys?.client;
          config.headers['uid'] = loginedKeys?.uid;
        }
        return config;
      },
      function (error: PromiseConstructor) {
        return Promise.reject(error);
      },
    );
  }

  public async getRequest<T = any>(this: APIClient, url: string, config?: AxiosRequestConfig) {
    const response = await this.axiosInstance.get<T>(url, config);
    const normalizeResponse = this.toCamelcaseKeys(response);
    return normalizeResponse;
  }

  public async patchRequest(
    this: APIClient,
    url: string,
    params: any,
    config?: AxiosRequestConfig,
  ) {
    const snakeParams: any = snakecaseKeys(params);
    const response = await this.axiosInstance.patch(url, snakeParams, config);
    const normalizeResponse = this.toCamelcaseKeys(response);
    return normalizeResponse;
  }

  public async postRequest<T = any>(
    this: APIClient,
    url: string,
    params: any,
    config?: AxiosRequestConfig,
  ) {
    const snakeParams = snakecaseKeys(params);
    const response = await this.axiosInstance.post<T>(url, snakeParams, config);
    const normalizeResponse = this.toCamelcaseKeys(response);
    return normalizeResponse;
  }

  public async deleteRequest(this: APIClient, url: string, config?: AxiosRequestConfig) {
    const data: any = snakecaseKeys(config?.data);
    const response = await this.axiosInstance.delete(url, { ...config, data: data });
    const normalizeResponse = this.toCamelcaseKeys(response);
    return normalizeResponse;
  }

  private toCamelcaseKeys<T>(response: AxiosResponse<T>) {
    const data = camelcaseKeys({ ...response.data }, { deep: true }); // NOTE deepによりネストされた箇所も変換対象となる。
    const normalizeResponse = { ...response, data };
    return normalizeResponse;
  }

  public _normalizeError(error: any) {
    const normalizeError: NormalizeError = {
      status: error.response && error.response.status,
      statusText: error.response.statusText,
      message: error.message,
      raw: error,
    };
    return normalizeError;
  }
}

export default new APIClient();
