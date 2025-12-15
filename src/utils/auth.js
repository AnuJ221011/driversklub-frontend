import { AUTH_LOGGED_IN_FLAG_KEY, AUTH_TOKEN_STORAGE_KEY } from './constants';

export function setAuthToken(token) {
  if (!token) return;
  localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
}

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
}

export function clearAuthToken() {
  localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
}

export function markLoggedIn() {
  localStorage.setItem(AUTH_LOGGED_IN_FLAG_KEY, '1');
}

export function clearLoggedIn() {
  localStorage.removeItem(AUTH_LOGGED_IN_FLAG_KEY);
}

export function isAuthenticated() {
  return (
    Boolean(getAuthToken()) ||
    localStorage.getItem(AUTH_LOGGED_IN_FLAG_KEY) === '1'
  );
}
