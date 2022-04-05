import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import { User } from '../models/userModel.js';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { awsUserPool } from '../utils/awsUserPool.js';

export const verifyEmailRoute = {
  path: '/api/verify-email',
  method: 'put',
  handler: async (req, res) => {
    const { email, verificationString } = req.body;

    new CognitoUser({ Username: email, Pool: awsUserPool }).confirmRegistration(
      verificationString,
      true,
      async (err) => {
        if (err)
          return res
            .status(401)
            .json({ msg: 'The email verification is incorrect' });

        const user = await User.findOne({ email });
        user.isVerified = true;

        const verifiedUser = await user.save();
        const { _id: id, info } = verifiedUser;

        jwt.sign(
          { id, email, isVerified: true, info },
          config.authJwtSecret,
          { expiresIn: '2d' },
          (err, token) => {
            if (err) return res.status(500);
            res.status(200).json({ token });
          }
        );
      }
    );
  },
};
