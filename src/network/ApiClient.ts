import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

type NormalizeError = {
  status: number;
  message: string;
  raw: any;
};

class APIClient {
  private axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.API_URL,
      // withCredentials: true
    });

    this.axiosInstance.interceptors.request.use(
      function (config: AxiosRequestConfig) {
        const accessToken = window.localStorage?.accessToken as string;
        const client = window.localStorage?.client as string;
        const uid = window.localStorage?.uid as string;
        if (accessToken && client && uid) {
          config.headers['access-token'] = accessToken;
          config.headers.client = client;
          config.headers.uid = uid;
        }
        return config;
      },
      function (error: PromiseConstructor) {
        return Promise.reject(error);
      },
    );
  }

  public async getRequest(this: APIClient, url: string, config?: AxiosRequestConfig) {
    try {
      const response = await this.axiosInstance.get(url, config);
      const normalizeResponse = this.toCamelcaseKeys(response);
      return normalizeResponse;
    } catch (e) {
      const error = this._normalizeError(e);
      return error;
    }
  }

  public async patchRequest(
    this: APIClient,
    url: string,
    params: any,
    config?: AxiosRequestConfig,
  ) {
    try {
      const snakeParams: any = snakecaseKeys(params);
      const response = await this.axiosInstance.patch(url, snakeParams, config);
      const normalizeResponse = this.toCamelcaseKeys(response);
      return normalizeResponse;
    } catch (e) {
      const error = this._normalizeError(e);
      return error;
    }
  }

  public async postRequest(this: APIClient, url: string, params: any, config?: AxiosRequestConfig) {
    try {
      const snakeParams: any = snakecaseKeys(params);
      const response = await this.axiosInstance.post(url, snakeParams, config);
      const normalizeResponse = this.toCamelcaseKeys(response);
      return normalizeResponse;
    } catch (e) {
      const error = this._normalizeError(e);
      return error;
    }
  }

  public async deleteRequest(this: APIClient, url: string, params: any) {
    try {
      const response = await this.axiosInstance.delete(url, params);
      return response;
    } catch (e) {
      const error = this._normalizeError(e);
      return error;
    }
  }

  private toCamelcaseKeys(response: AxiosResponse<any>) {
    const data = camelcaseKeys({ ...response.data }, { deep: true }); // NOTE deepによりネストされた箇所も変換対象となる。
    const normalizeResponse = { ...response, data };
    return normalizeResponse;
  }

  private _normalizeError(error: any) {
    const normalizeError: NormalizeError = {
      status: error.response && error.response.status,
      message: error.message,
      raw: error,
    };
    return normalizeError;
  }
}

export default new APIClient();
