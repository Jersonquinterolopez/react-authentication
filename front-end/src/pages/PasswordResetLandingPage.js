import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PasswordResetFail } from './PasswordResetFail.js';
import { PasswordResetSuccess } from './PasswordResetSuccess.js';
import axios from 'axios';

export const PasswordResetLandingPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  const { passwordResetCode } = useParams();

  const onResetClicked = async () => {
    try {
      await axios.put(`/api/users/${passwordResetCode}/reset-password`, {
        newPassword: passwordValue,
      });
      setIsSuccess(true);
    } catch (error) {
      setIsFailure(true);
    }
  };

  const isValid =
    !passwordValue ||
    !confirmPasswordValue ||
    passwordValue !== confirmPasswordValue;

  if (isFailure) return <PasswordResetFail />;
  if (isSuccess) return <PasswordResetSuccess />;

  return (
    <div className="content-container">
      <h1>Reset Password</h1>
      <p>Please enter a new password</p>
      <input
        type="password"
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
        placeholder={'password'}
      />
      <input
        type="password"
        value={confirmPasswordValue}
        onChange={(e) => setConfirmPasswordValue(e.target.value)}
        placeholder={'confirm password'}
      />
      <button disabled={isValid} onClick={onResetClicked}>
        Reset Passowrd
      </button>
    </div>
  );
};
