import { User } from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import { v4 as uuid } from 'uuid';
import { sendEmail } from '../utils/sendEmail.js';

export const signUpRoute = {
  path: '/api/signup',
  method: 'post',
  handler: async (req, res) => {
    const { email, password } = req.body;

    // check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        error: 'User already exists',
      });
    }

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // create the e-mail verification
    const verificationString = uuid();

    const startingInfo = {
      hairColor: '',
      favoriteFood: '',
      bio: '',
    };

    // create new user
    const newUser = new User({
      email,
      passwordHash,
      info: startingInfo,
      isVerified: false,
      verificationString: verificationString,
    });

    // save user
    const savedUser = await newUser.save();

    // send verification email
    try {
      await sendEmail({
        to: email,
        from: 'jersonquinterolopez@gmail.com',
        subject: 'Please Verify your email',
        text: `Thanks for signing up! Please verify your email by clicking this link: http://localhost:3000/verify-email/${verificationString}`,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }

    // create token
    jwt.sign(
      { _id: savedUser._id },
      config.authJwtSecret,
      {
        expiresIn: '2d',
      },
      (err, token) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(200).json({ token });
      }
    );
  },
};
