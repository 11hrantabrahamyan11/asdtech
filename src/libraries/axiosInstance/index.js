import axios from 'axios';
import {localStorage, constants} from '~/helpers';

const requestDefaultConfig = {
  baseURL: constants.API_BASE_URL,
};

const axiosInstance = axios.create(requestDefaultConfig);

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.load(constants.LOCAL_STORAGE_KEYS.token);

    if (token) {
      config.headers['x-test-app-jwt-token'] = token;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

export default axiosInstance;
