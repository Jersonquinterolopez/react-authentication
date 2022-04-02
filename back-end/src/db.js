import mongoose from 'mongoose';
import config from '../src/config/index.js';

export const initializeDbConnection = async () => {
  mongoose.connect(
    config.dbConnection,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) return console.error(err);
      console.log('MongoDB connection stablished');
    }
  );
};
