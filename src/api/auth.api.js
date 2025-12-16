import { api } from './axios';
import { AUTH_SEND_OTP_PATH, AUTH_VERIFY_OTP_PATH } from '../utils/constants';

export async function sendOtpWhatsApp({ phone }) {
  const { data } = await api.post(AUTH_SEND_OTP_PATH, { phone });
  return data;
}

export async function verifyOtp({ phone, otp }) {
  const { data } = await api.post(AUTH_VERIFY_OTP_PATH, { phone, otp });
  return data;
}
