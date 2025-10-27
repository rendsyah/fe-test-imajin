import axios from 'axios';
import { Api } from '../constants/api.const';
import { getSession } from '../utils/session';

export const externalAPI = axios.create({
  baseURL: Api.API_BASE_URL,
  timeout: Api.MAX_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

externalAPI.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session.token) {
    config.headers.Authorization = `Bearer ${session.token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

externalAPI.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);
