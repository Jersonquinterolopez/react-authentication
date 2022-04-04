import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { awsUserPool } from '../utils/awsUserPool';

export const signUpRoute = {
  path: '/api/signup',
  method: 'post',
  handler: async (req, res) => {
    const { email, password } = req.body;

    const attributes = [
      new CognitoUserAttribute({ Name: 'email', Value: email }),
    ];

    awsUserPool.signUp(
      email,
      password,
      attributes,
      null,
      async (err, awsResult) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: 'Unable to signup user' });
        }

        const startingInfo = {
          hairColor: '',
          favoriteFood: '',
          bio: '',
        };

        const newUser = new User({
          email,
          info: startingInfo,
        });

        const savedUser = await newUser.save();
        const { _id } = savedUser;

        jwt.sign(
          {
            id: _id,
            isVerified: false,
            email,
            info: startingInfo,
          },
          config.authJwtSecret,
          {
            expiresIn: '2d',
          },
          (err, token) => {
            if (err) return res.status(500);
            res.status(200).json({ token });
          }
        );
      }
    );
  },
};
