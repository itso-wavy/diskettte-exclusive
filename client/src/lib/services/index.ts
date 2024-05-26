import axios from 'axios';
import { refreshAccessToken } from './auth';
import { store } from '../store';

const client = axios.create({
  baseURL: 'http://localhost:3000/',
  // timeout: 5000,
  withCredentials: true,
});

client.interceptors.request.use(
  config => {
    const {
      auth: { accessToken },
    } = store.getState();

    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 403 && !error.config._retry) {
      const originalRequest = error.config;
      originalRequest._retry = true;

      try {
        const accessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return axios(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default client;
