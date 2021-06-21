import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

type NormalizeError = {
  status: number;
  message: string;
  raw: any;
};

class APIClient {
  public axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      // 初期のtemplateリポジトリ時点では https://jsonplaceholder.typicode.com/posts を envファイルに入れている想定
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

  async getRequest(url: string, config?: AxiosRequestConfig) {
    try {
      const response = await this.axiosInstance.get(url, config);
      const normalizeResponse = this.toCamelcaseKeys(response);
      return normalizeResponse;
    } catch (e) {
      const error = this._normalizeError(e);
      return error;
    }
  }

  async postRequest(url: string, params: any, config?: AxiosRequestConfig) {
    try {
      /*
       * NOTE axiosの処理がpost から OPTIONS に変わってしまうので下記のようにクエリパラメーターを構築している。
       **/
      const snakeParams: any = snakecaseKeys(params);
      const normalizeParams = new URLSearchParams(snakeParams);
      const response = await this.axiosInstance.post(url, normalizeParams, config);
      return response;
    } catch (e) {
      const error = this._normalizeError(e);
      return error;
    }
  }

  async deleteRequest(url: string, params: any) {
    try {
      const response = await this.axiosInstance.delete(url, params);
      return response;
    } catch (e) {
      const error = this._normalizeError(e);
      return error;
    }
  }

  // handleResponse (response: AxiosResponse<any>) {
  //   const { data, status } = response
  //   if (status === 200) {
  //     return data
  //   }
  //   throw new Error(data)
  // }

  toCamelcaseKeys(response: AxiosResponse<any>) {
    const data = camelcaseKeys({ ...response.data });
    const normalizeResponse = { ...response, data };
    return normalizeResponse;
  }

  _normalizeError(error: any) {
    const normalizeError: NormalizeError = {
      status: error.response && error.response.status,
      message: error.message,
      raw: error,
    };
    return normalizeError;
  }
}

export default new APIClient();
