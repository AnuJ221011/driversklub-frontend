import { api } from './axios';
import { AUTH_SEND_OTP_PATH, AUTH_VERIFY_OTP_PATH } from '../utils/constants';

export async function sendOtpWhatsApp({ phone }) {
  const payload = {
    phone,
    phoneNumber: phone,
    phoneNo: phone,
    channel: 'whatsapp',
  };

  const { data } = await api.post(AUTH_SEND_OTP_PATH, payload);
  return data;
}

export async function verifyOtp({ phone, otp, requestId }) {
  const payload = {
    phone,
    phoneNumber: phone,
    phoneNo: phone,
    otp,
    code: otp,
    requestId,
  };

  const { data } = await api.post(AUTH_VERIFY_OTP_PATH, payload);
  return data;
}
