import { User } from '../models/userModel.js';
import { v4 as uuid } from 'uuid';

export const updateOrCreateUserFromOauth = async ({ oauthUserInfo }) => {
  const { id: googleId, verified_email: isVerified, email } = oauthUserInfo;

  const existingUser = await User.findOne({ email });
  const verificationString = uuid();

  if (existingUser) {
    existingUser.googleId = googleId;
    existingUser.isVerified = isVerified;
    const savedUser = existingUser.save();
    return savedUser;
  } else {
    const newUser = new User({
      email,
      passwordHash,
      info: {},
      isVerified,
      googleId,
      verificationString: verificationString,
    });

    const savedUser = await newUser.save();
    return savedUser;
  }
};
