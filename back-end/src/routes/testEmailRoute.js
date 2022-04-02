import { sendEmail } from '../utils/sendEmail.js';

export const testEmailRoute = {
  path: '/api/test-email',
  method: 'post',
  handler: async (req, res) => {
    try {
      await sendEmail({
        to: 'jersonquinterolopez+test1@gmail.com',
        from: 'jersonquinterolopez@gmail.com',
        subject: 'Test email',
        text: 'This is a test email',
      });
      res.status(200).json({ message: 'Email sent Ok' });
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },
};
