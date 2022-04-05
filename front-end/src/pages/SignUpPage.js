import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../features/auth/useToken.js';

export const SignUpPage = () => {
  const [token, setToken] = useToken();

  const [errorMessage, setErrorMessage] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');

  const history = useHistory();
  const onSignUpClick = async () => {
    const response = await axios.post('/api/signup', {
      email: emailValue,
      password: passwordValue,
    });

    const { token } = response.data;
    setToken(token);
    history.push(`/please-verify?email=${encodeURIComponent(emailValue)}`);
  };

  return (
    <div className="content-container">
      <h1>Sign Up</h1>
      {errorMessage && <div className="fail">{errorMessage}</div>}
      <input
        type="text"
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
        name="email"
        placeholder="someone@gmail.com"
      />
      <input
        type="password"
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
        placeholder="password"
      />
      <input
        type="password"
        value={confirmPasswordValue}
        onChange={(e) => setConfirmPasswordValue(e.target.value)}
        placeholder="confir password"
      />
      <hr />
      <button
        disabled={
          !emailValue ||
          !passwordValue ||
          passwordValue !== confirmPasswordValue
        }
        onClick={onSignUpClick}
      >
        Sign Up
      </button>
      <button onClick={() => history.push('/login')}>
        Already have an account? Log In
      </button>
    </div>
  );
};
