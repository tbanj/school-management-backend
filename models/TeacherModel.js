const mongoose = require('mongoose');

/**
 * Mongoose Teacher schema which is a description/blueprint of how we want our data to look like
 */
const TeacherSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  date_of_hiring: {
    type: String,
    required: true,
  },
});

// Model which provides us with an interface for interacting with our data
const TeacherModel = mongoose.model('Teacher', TeacherSchema);

module.exports = TeacherModel;
