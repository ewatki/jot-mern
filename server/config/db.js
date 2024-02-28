// Connect using Mongoose instead of MongoDB
const mongoose = require('mongoose');

let dbConnection;
let uri = process.env.MONGO_URI;

module.exports = {
  connectToDb: (cb) => {
    const mongoDB = uri;
    mongoose.connect(mongoDB, {       serverSelectionTimeoutMS: 5000,
    });

    dbConnection = mongoose.connection;

    dbConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));
    dbConnection.once('open', function() {
      console.log('Connected to MongoDB');
      return cb();
    });
  },
  getDb: () => dbConnection,
};
