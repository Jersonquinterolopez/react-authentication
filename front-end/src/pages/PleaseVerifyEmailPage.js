import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useQueryParams } from '../util/useQueryParams.js';

export const PleaseVerifyEmailPage = () => {
  const history = useHistory();
  const { email } = useQueryParams();

  useEffect(() => {
    setTimeout(() => {
      history.push(`/verify-email?email=${encodeURIComponent(email)}`);
    }, 3000);
  }, [history, email]);

  return (
    <div className="content-container">
      <h1>Thanks for signin Up!</h1>
      <p>
        A verification email has been sent to your email. Please verify your
        email to unluck our features.
      </p>
    </div>
  );
};
