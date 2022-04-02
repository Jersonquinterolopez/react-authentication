import sendgrid from '@sendgrid/mail';
import config from '../config/index.js';

sendgrid.setApiKey(config.sendgridApiKey);

export const sendEmail = ({ to, from, subject, text, html }) => {
  const msg = {
    to,
    from,
    subject,
    text,
    html,
  };
  return sendgrid.send(msg);
};
