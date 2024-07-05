const mongoose = require('mongoose');
require('dotenv').config();
 
// MongoDB connection URI
 
const uri = process.env.MONGODB_URI;
// Mongoose connection establishment
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connection object
const db = mongoose.connection;

// db object event listeners
db.on('connected', () => {
  console.log('db connected!');
});

db.on('disconnected', () => {
  console.log('db disconnected!');
});

// Optionally, you might want to handle connection errors
db.on('error', (err) => {
  console.log('db connection error:', err);
});

module.exports = db;
