import bcrypt from 'bcrypt';
import { User } from '../models/userModel.js';

export const resetPasswordRoute = {
  path: '/api/users/:passwordResetCode/reset-password',
  method: 'put',
  handler: async (req, res) => {
    try {
      const { passwordResetCode } = req.params;
      const { newPassword } = req.body;

      const salt = await bcrypt.genSalt();
      const newPasswordHash = await bcrypt.hash(newPassword, salt);

      const user = await User.findOne({ passwordResetCode: passwordResetCode });

      if (!user) return res.status(400);

      user.passwordHash = newPasswordHash;
      user.passwordResetCode = '';

      await user.save();
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
};
