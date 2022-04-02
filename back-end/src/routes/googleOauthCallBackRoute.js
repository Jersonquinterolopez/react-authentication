import jwt from 'jsonwebtoken';
import { getGoogleUser } from '../utils/getGoogleUser';
import { updateOrCreateUserFromOauth } from '../utils/updateOrCreateUserFromOauth';
import config from '../config';

export const googleOauthCallBackRoute = {
  path: '/auth/google/callback',
  method: 'get',
  handler: async (req, res) => {
    try {
      const { code } = req.query;
      const oauthUserInfo = await getGoogleUser({ code });
      const updatedUser = await updateOrCreateUserFromOauth({ oauthUserInfo });
      const { _id: id, isVerified, email, info } = updatedUser;

      jwt.sign(
        { id, isVerified, email, info },
        config.authJwtSecret,
        (error, token) => {
          if (error) return res.status(500).send(error);
          res.redirect(`http://localhost:3000/login?token=${token}`);
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
};
