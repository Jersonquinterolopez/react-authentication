import jwt, { decode } from 'jsonwebtoken';
import config from '../config/index.js';
import { User } from '../models/userModel.js';

export const updateUserInfoRoute = {
  path: '/api/users/:userId',
  method: 'put',
  handler: async (req, res) => {
    const { authorization } = req.headers;
    const { userId } = req.params;

    const updates = (({ hairColor, favoriteFood, bio }) => ({
      hairColor,
      favoriteFood,
      bio,
    }))(req.body);

    if (!authorization) {
      return res.status(401).json({
        message: 'No authorization header sent.',
      });
    }

    const token = authorization.split(' ')[1];

    jwt.verify(token, config.authJwtSecret, async (err, decodedToken) => {
      if (err)
        return res.status(401).json({ message: 'Unable to verify token.' });

      const { id, isVerified } = decodedToken;

      if (id !== userId)
        return res
          .status(403)
          .json({ message: 'You are not authorized to update this user.' });

      if (!isVerified)
        return res.status(403).json({
          message: 'Please verify your email before you can update your data.',
        });

      const filter = { _id: userId };

      const result = await User.findOne(filter);
      result.info.hairColor = updates.hairColor;
      result.info.favoriteFood = updates.favoriteFood;
      result.info.bio = updates.bio;

      const updatedUser = await result.save();

      const { email, info } = updatedUser;

      jwt.sign(
        { id, email, isVerified, info },
        config.authJwtSecret,
        { expiresIn: '2d' },
        (err, token) => {
          if (err) {
            return res.status(200).json(err);
          }
          res.status(200).json({ token });
        }
      );
    });
  },
};
