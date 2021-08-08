import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

type NormalizeError = {
  data: {
    status: number;
    message: string;
    statusText: string;
    raw: any;
  };
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
        const { accessToken, client, uid } = localStorage;
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

  public async deleteRequest(this: APIClient, url: string, config?: AxiosRequestConfig) {
    try {
      const response = await this.axiosInstance.delete(url, config);
      const normalizeResponse = this.toCamelcaseKeys(response);
      return normalizeResponse;
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
      // axiosの『data』でのアクセスに合わせてdataで囲む
      data: {
        status: error.response && error.response.status,
        statusText: error.response.statusText,
        message: error.message,
        raw: error,
      },
    };
    return normalizeError;
  }
}

export default new APIClient();
