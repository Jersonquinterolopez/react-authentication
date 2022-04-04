import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const User = mongoose.model(
  'User',
  new Schema({
    email: { type: String, required: true, unique: true },
    info: {
      hairColor: { type: String },
      favoriteFood: { type: String },
      bio: { type: String },
    },
    isVerified: { type: Boolean, default: false },
    verificationString: { type: String, default: false },
    passwordResetCode: { type: String, default: false },
    googleId: { type: String, default: false },
  })
);
