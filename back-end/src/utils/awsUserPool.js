import { CongnitoUserPool } from 'amazon-cognito-identity-js';
import AWS, { CognitoIdentityCredentials } from 'aws-sdk';
import nodeFetch from 'node-fetch';
global.fetch = nodeFetch;
// we are going to be using fetch that by default is providing by browsers to comunicate with amazon web services, sy by saying global.fecth = nodeFetch we are allowing the backend to do that even thoo is in node and not in the browser

AWS.config.region = process.env.AWS_REGION;
AWS.config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: process.env.AWS_IDENTITY_POOL_ID,
});

const poolData = {
  UserPoolId: process.env.AWS_USER_POO_ID,
  ClientId: process.env.AWS_CLIENT_ID,
};

export const awsUserPool = new CongnitoUserPool(poolData);
