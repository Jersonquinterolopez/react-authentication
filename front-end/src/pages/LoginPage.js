import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../features/auth/useToken';
import { useQueryParams } from '../util/useQueryParams';

export const LoginPage = () => {
  const [, setToken] = useToken();
  const [errorMessage, setErrorMessage] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [googleOauthUrl, setGoogleOauthUrl] = useState('');
  const { token: oauthToken } = useQueryParams();

  const history = useHistory();

  useEffect(() => {
    const loadOauthUrl = async () => {
      try {
        const response = await axios.get('/auth/google/url');
        const { url } = response.data;
        setGoogleOauthUrl(url);
      } catch (error) {
        console.log(error);
      }
    };

    loadOauthUrl();
  }, []);

  useEffect(() => {
    if (oauthToken) {
      setToken(oauthToken);
      history.push('/');
    }
  }, [oauthToken, setToken, history]);

  const onLogInClicked = async () => {
    try {
      const response = await axios.post('/api/login', {
        email: emailValue,
        password: passwordValue,
      });
      const { token } = response.data;
      setToken(token);
      history.push('/');
    } catch (error) {
      error.response.data.msg && setErrorMessage(error.response.data.msg);
    }
  };

  return (
    <div className="content-container">
      <h1>Log in</h1>
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
      <hr />
      <button disabled={!emailValue || !passwordValue} onClick={onLogInClicked}>
        Log in
      </button>
      <button onClick={() => history.push('/forgot-password')}>
        Forgot your password
      </button>
      <button onClick={() => history.push('/signup')}>
        Don't have an account? Sign Up
      </button>
      <button
        disabled={!googleOauthUrl}
        onClick={() => {
          window.location.href = googleOauthUrl;
        }}
      >
        Log in with google
      </button>
    </div>
  );
};
