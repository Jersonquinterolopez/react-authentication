import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
} from 'amazon-cognito-identity-js';
import { awsUserPool } from '../utils/awsUserPool.js';

export const logInRoute = {
  path: '/api/login',
  method: 'post',
  handler: async (req, res) => {
    const { email, password } = req.body;

    new CognitoUser({ Username: email, Pool: awsUserPool }).authenticateUser(
      new AuthenticationDetails({ Username: email, Password: password }),
      {
        onSuccess: async (result) => {
          // find the user
          const user = await User.findOne({ email });
          const { _id: id, isVerified, info } = user;

          jwt.sign(
            { id, isVerified, email, info },
            config.authJwtSecret,
            {
              expiresIn: '2d',
            },
            (err, token) => {
              if (err) {
                return res.status(500);
              }
              res.status(200).json({ token });
            }
          );
        },
        onFailure: (err) => {
          console.log(err);
          return res.status(401);
        },
      }
    );
  },
};
