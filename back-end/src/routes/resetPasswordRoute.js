import { CognitoUser } from 'amazon-cognito-identity-js';
import { awsUserPool } from '../utils/awsUserPool.js';

export const resetPasswordRoute = {
  path: '/api/users/:passwordResetCode/reset-password',
  method: 'put',
  handler: async (req, res) => {
    const { passwordResetCode } = req.params;
    const { email, newPassword } = req.body;

    new CognitoUser({ Username: email, Pool: awsUserPool }).confirmPassword(
      passwordResetCode,
      newPassword,
      {
        onSuccess: () => {
          return res.status(200);
        },
        onFailure: () => {
          return res.status(401);
        },
      }
    );
  },
};
