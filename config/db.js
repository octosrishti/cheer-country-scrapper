/*
MongoDB connections
*/

const mongoose = require('mongoose');

function connectDB() {
  const database_url = "mongodb://localhost:27017/parser";
  mongoose.connect(database_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection
    .once('open', () => {
      console.log('Database connected');
    })
    .on('error', (e) => {
      console.log('Connection failed with error', e);
    });
}

module.exports = connectDB;
