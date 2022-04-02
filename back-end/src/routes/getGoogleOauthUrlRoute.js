import { getGoogleOauthUrl } from '../utils/getGoogleOauthUrl';

export const getGoogleOauthUrlRoute = {
  path: '/auth/google/url',
  method: 'get',
  handler: (req, res) => {
    const url = getGoogleOauthUrl();
    return res.status(200).json({ url });
  },
};
