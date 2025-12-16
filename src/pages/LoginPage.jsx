import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import Button from '../components/Button';
import Input from '../components/Input';
import Loader from '../components/Loader';
import { sendOtpWhatsApp, verifyOtp } from '../api/auth.api';
import { getApiErrorMessage } from '../api/axios';
import { markLoggedIn, setAuthToken } from '../utils/auth';

function normalizePhone(value) {
  return value.replace(/\s+/g, '');
}

function isLikelyPhone(value) {
  const v = normalizePhone(value);
  // Allows: +919876543210, 9876543210, 919876543210
  return /^\+?[0-9]{10,15}$/.test(v);
}

export default function LoginPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const otpRef = useRef(null);

  const phoneOk = useMemo(() => isLikelyPhone(phone), [phone]);
  const otpOk = useMemo(() => /^\d{6}$/.test(otp), [otp]);

  async function onSendOtp() {
    if (!phoneOk) {
      toast.error('Enter a valid phone number');
      return;
    }

    setSending(true);
    try {
      const res = await sendOtpWhatsApp({ phone: normalizePhone(phone) });

      toast.success(res?.message || 'OTP sent via WhatsApp');
      setStep('otp');
      setOtp('');

      setTimeout(() => otpRef.current?.focus?.(), 0);
    } catch (e) {
      toast.error(getApiErrorMessage(e));
    } finally {
      setSending(false);
    }
  }

  async function onVerifyOtp() {
    if (!phoneOk) {
      toast.error('Enter a valid phone number');
      return;
    }
    if (!otpOk) {
      toast.error('Enter the OTP');
      return;
    }

    setVerifying(true);
    try {
      const res = await verifyOtp({
        phone: normalizePhone(phone),
        otp,
      });

      const token =
        res?.token ||
        res?.accessToken ||
        res?.data?.token ||
        res?.data?.accessToken ||
        null;

      if (token) setAuthToken(token);
      markLoggedIn();

      toast.success(res?.message || 'OTP verified');
      navigate('/admin/dashboard', { replace: true });
    } catch (e) {
      toast.error(getApiErrorMessage(e));
    } finally {
      setVerifying(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-6 py-10">
        <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-gray-900">Admin Login</h1>
            <p className="mt-1 text-sm text-gray-600">
              Login with OTP sent to your WhatsApp number.
            </p>
          </div>

          <div className="space-y-4">
            <Input
              id="phone"
              label="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +919876543210"
              inputMode="tel"
              autoComplete="tel"
              disabled={sending || verifying || step === 'otp'}
            />

            {step === 'phone' ? (
              <Button
                className="w-full"
                onClick={onSendOtp}
                disabled={!phoneOk || sending}
              >
                {sending ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader /> Sending OTP
                  </span>
                ) : (
                  'Send OTP via WhatsApp'
                )}
              </Button>
            ) : (
              <>
                <Input
                  id="otp"
                  label="OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter OTP"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  disabled={verifying}
                  ref={otpRef}
                />

                <Button
                  className="w-full"
                  onClick={onVerifyOtp}
                  disabled={!otpOk || verifying}
                >
                  {verifying ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader /> Verifying
                    </span>
                  ) : (
                    'Verify OTP'
                  )}
                </Button>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    className="text-sm font-medium text-gray-700 hover:text-black"
                    onClick={() => {
                      setStep('phone');
                      setOtp('');
                    }}
                    disabled={sending || verifying}
                  >
                    Change number
                  </button>

                  <button
                    type="button"
                    className="text-sm font-medium text-gray-700 hover:text-black"
                    onClick={onSendOtp}
                    disabled={!phoneOk || sending || verifying}
                  >
                    {sending ? 'Resending…' : 'Resend OTP'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
