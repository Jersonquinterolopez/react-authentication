import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import { User } from '../models/userModel.js';

export const verifyEmailRoute = {
  path: '/api/verify-email',
  method: 'put',
  handler: async (req, res) => {
    const { verificationString } = req.body;
    const result = await User.findOne({ verificationString });

    if (!result)
      return res
        .status(401)
        .json({ message: 'The email verification code is incorrect' });

    const { _id: id, email, info } = result;
    await User.findByIdAndUpdate(id, { isVerified: true });

    jwt.sign(
      { id, email, isVerified: true, info },
      config.authJwtSecret,
      { expiresIn: '2d' },
      (err, token) => {
        if (err) return res.status(500);
        res.status(200).json({ token });
      }
    );
  },
};
