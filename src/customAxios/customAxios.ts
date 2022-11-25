import Axios, { AxiosError, AxiosRequestConfig } from 'axios';

const axios = Axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = { Authorization: `Bearer ${token}` };
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

axios.interceptors.request.use(onRequest, onRequestError);

export default axios;
