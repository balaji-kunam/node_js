const mongoose = require('mongoose');
require('dotenv').config();

// Define the schema for the Demographic model
const demographicSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  city:{
    type:String,
    required:true,
    enum: ['ongole', 'vijayawada', 'guntur', 'tenali', 'chirala']
  }
});

// Create the model from the schema
const Demographic = mongoose.model('Demographic', demographicSchema);

module.exports = Demographic;
