import { CognitoUser } from 'amazon-cognito-identity-js';
import { awsUserPool } from '../utils/awsUserPool.js';

export const forgotPasswordRoute = {
  path: '/api/forgot-password/:email',
  method: 'put',
  handler: async (req, res) => {
    const { email } = req.params;

    new CognitoUser({ Username: email, Pool: awsUserPool }).forgotPassword({
      onSuccess: () => {
        return res.status(200).send();
      },
      onFailure: () => {
        return res.status(500).send();
      },
    });
  },
};
