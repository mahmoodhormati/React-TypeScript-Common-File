import QueryString from 'qs';
import { configure } from './GlobalUrl';
import Axios, { AxiosInstance } from 'axios';
import { RequestConfig } from './Configuration/RequestConfig';
import { ApiConfiguration } from './Configuration/ApiConfiguration';
import { handleServiceError } from './HandelServiceError';
import { ResultModel } from '../../Model/ResultModel';

export interface IHttpClient {
  post<TRequest, TResponse>(
    path: string,
    object: TRequest,
    config?: RequestConfig
  ): Promise<TResponse>;
  patch<TRequest, TResponse>(
    path: string,
    object: TRequest
  ): Promise<TResponse>;
  put<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>;
  get<TResponse>(endPoint: string,
    data: any): Promise<TResponse>;
  delete<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>;
}

export default class HttpClient implements IHttpClient {
  private client: AxiosInstance;

  protected createAxiosClient(
    apiConfiguration: ApiConfiguration
  ): AxiosInstance {
    return Axios.create({
      baseURL: configure,
      responseType: 'json' as const,
      headers: {
        'Content-Type': 'application/json',
        ...(apiConfiguration.accessToken && {
          Authorization: `Bearer ${apiConfiguration.accessToken}`,


        }),
      },
      timeout: 100 * 1000,
    });
  }

  constructor(apiConfiguration?: ApiConfiguration) {

    if (apiConfiguration === undefined || apiConfiguration === null) {

      apiConfiguration = new ApiConfiguration();
    }
    this.client = this.createAxiosClient(apiConfiguration);

  }

  async post<TRequest, TResponse>(
    path: string,
    payload: TRequest,
    config?: RequestConfig
  ): Promise<TResponse> {
    try {
      const response = config
        ? await this.client.post<TResponse>(path, payload, config)
        : await this.client.post<TResponse>(path, payload);
      const result = response.data as ResultModel;

      return result.result as TResponse
    } catch (error) {
      handleServiceError(error);
    }
    return null as TResponse;
  }

  async patch<TRequest, TResponse>(
    path: string,
    payload: TRequest
  ): Promise<TResponse> {
    try {
      const response = await this.client.patch<TResponse>(path, payload);
      const result = response.data as ResultModel;

      return result.result as TResponse
    } catch (error) {
      handleServiceError(error);
      return null as TResponse;

    }
  }

  async put<TRequest, TResponse>(
    path: string,
    payload: TRequest
  ): Promise<TResponse> {
    try {
      const response = await this.client.put<TResponse>(path, payload);
      const result = response.data as ResultModel;

      return result.result as TResponse
    } catch (error) {
      handleServiceError(error);
      return null as TResponse;

    }
  }

  async get<TResponse>(endPoint: string,
    data: any = null): Promise<TResponse> {

    let queryParams = ""
    if (data != null)
      queryParams = QueryString.stringify(data);

    if (queryParams.length > 0)
      endPoint += `?${queryParams}`;



    try {
      const response = await this.client.get<ResultModel>(endPoint);
      const result = response.data.result as TResponse;

      return result
    } catch (error) {
      handleServiceError(error);




      return null as TResponse;

    }
  }

  async delete<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse> {
    try {

      let config = {
        data: object
      }
      const response = await this.client.delete<TResponse>(path, config)
      const result = response.data as TResponse;
      return result
    } catch (error) {
      handleServiceError(error);
      return null as TResponse;

    }
  }
}

