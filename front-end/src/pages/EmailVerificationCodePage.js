import { useState } from 'react';
import axios from 'axios';
import { EmailVerificationSuccess } from './EmailVerificationSuccess.js';
import { EmailVerificationFail } from './EmailVerificationFail.js';
import { useToken } from '../features/auth/useToken.js';
import { useQueryParams } from '../util/useQueryParams.js';

export const EmailVerificationCodePage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);

  const [verificationString, setVerificationString] = useState('');
  const { email } = useQueryParams();
  const [, setToken] = useToken();

  const onSubmitVerificationString = async () => {
    try {
      const response = await axios.put('/api/verify-email', {
        email,
        verificationString,
      });
      const { token } = await response.data;
      setToken(token);
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
      setIsFailure(true);
    }
  };

  if (isSuccess) return <EmailVerificationSuccess />;
  if (isFailure) return <EmailVerificationFail />;

  return (
    <div className="content-container">
      <h1>Please verify your Email</h1>
      <p>
        You should received a verification code at the email address you
        provided. Please enter it here
      </p>
      <input
        placeholder="e.g 1232132"
        value={verificationString}
        onChange={(e) => setVerificationString(e.target.value)}
      />
      <button onClick={onSubmitVerificationString}>Submit</button>
    </div>
  );
};
