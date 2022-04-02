import { testRoute } from './testRoute';
import { getGoogleOauthUrlRoute } from './getGoogleOauthUrlRoute.js';
import { forgotPasswordRoute } from './forgotPasswordRoute.js';
import { googleOauthCallBackRoute } from './googleOauthCallBackRoute.js';
import { logInRoute } from './logInRoute.js';
import { resetPasswordRoute } from './resetPasswordRoute.js';
import { signUpRoute } from './signUpRoute.js';
import { testEmailRoute } from './testEmailRoute.js';
import { updateUserInfoRoute } from './updateUserInfoRoute.js';
import { verifyEmailRoute } from './verifyEmailRoute.js';

export const routes = [
  testRoute,
  getGoogleOauthUrlRoute,
  forgotPasswordRoute,
  googleOauthCallBackRoute,
  logInRoute,
  resetPasswordRoute,
  signUpRoute,
  testEmailRoute,
  updateUserInfoRoute,
  verifyEmailRoute,
];
