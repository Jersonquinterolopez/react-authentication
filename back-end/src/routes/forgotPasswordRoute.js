import { v4 as uuid } from 'uuid';
import { sendEmail } from '../utils/sendEmail.js';
import { User } from '../models/userModel.js';

export const forgotPasswordRoute = {
  path: '/api/forgot-password/:email',
  method: 'put',
  handler: async (req, res) => {
    const { email } = req.params;
    console.log(email);

    // generate reset code
    const passwordResetCode = uuid();
    console.log(passwordResetCode);

    const result = await User.updateOne(
      { email },
      { passwordResetCode: passwordResetCode }
    );

    console.log(result);

    if (result.modifiedCount > 0) {
      try {
        await sendEmail({
          to: email,
          from: 'jersonquinterolopez@gmail.com',
          subject: 'Password Reset',
          text: `
            To reset your pasword, click this link: 
            http://localhost:3000/reset-password/${passwordResetCode}
          `,
        });
      } catch (error) {
        console.log(error);
        return res.status(500);
      }
    }

    return res.status(200).send('Ok 200');
  },
};
