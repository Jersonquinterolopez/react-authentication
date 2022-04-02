const dotenv = require('dotenv');
dotenv.config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 8080,
  authJwtSecret: process.env.JWT_TOKEN,
  dbConnection: process.env.MONGODB_CONNECTION_STRING,
  clientUrl: process.env.CLIENT_URL,
  serviceToken: process.env.SERVICE_TOKEN,
  sendgridApiKey: process.env.SENDGRID_API_KEY,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
};
export default config;
