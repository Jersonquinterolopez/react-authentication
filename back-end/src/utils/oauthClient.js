import { google } from 'googleapis';
import config from '../config/index.js';

export const oauthClient = new google.auth.OAuth2(
  config.googleClientId,
  config.googleClientSecret,
  'http://localhost:8080/auth/google/callback'
);
