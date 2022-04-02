import { User } from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';

export const logInRoute = {
  path: '/api/login',
  method: 'post',
  handler: async (req, res) => {
    const { email, password } = req.body;

    // find the user
    const user = await User.findOne({ email });

    // check if user exists
    if (!user)
      return res.status(401).json({
        msg: 'Unauthorized',
      });

    // check if password is correct
    const { _id: id, isVerified, passwordHash, info } = user;
    const isPasswordValid = await bcrypt.compare(password, passwordHash);

    if (isPasswordValid) {
      // create token
      const token = jwt.sign(
        { id, isVerified, email, info },
        config.authJwtSecret,
        {
          expiresIn: '2d',
        },
        (err, token) => {
          if (err) {
            return res.status(500).send(err);
          }
          res.status(200).json({ token });
        }
      );
    } else {
      return res.status(401).json({
        msg: 'Invalid Credentials',
      });
    }
  },
};
