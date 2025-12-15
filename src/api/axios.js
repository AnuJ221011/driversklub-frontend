import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { getAuthToken } from '../utils/auth';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function getApiErrorMessage(error) {
  const maybeAxios = error;
  return (
    maybeAxios?.response?.data?.message ||
    maybeAxios?.response?.data?.error ||
    maybeAxios?.message ||
    'Something went wrong'
  );
}
