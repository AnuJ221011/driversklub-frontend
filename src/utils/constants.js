export const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

export const AUTH_SEND_OTP_PATH =
  import.meta.env.VITE_AUTH_SEND_OTP_PATH ?? '/auth/send-otp';

export const AUTH_VERIFY_OTP_PATH =
  import.meta.env.VITE_AUTH_VERIFY_OTP_PATH ?? '/auth/verify-otp';

export const AUTH_TOKEN_STORAGE_KEY =
  import.meta.env.VITE_AUTH_TOKEN_KEY ?? 'dk_admin_token';

export const AUTH_LOGGED_IN_FLAG_KEY =
  import.meta.env.VITE_AUTH_LOGGED_IN_FLAG_KEY ?? 'dk_admin_logged_in';
