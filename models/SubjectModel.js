const mongoose = require('mongoose');

/**
 * Mongoose Subject schema which is a description/blueprint of how we want our data to look like
 */
const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    
  },
  abbreviation: {
    type: String,
    required: true,
    unique: true,
  },
  id_area: {
    type: Number,
    required: true,
  },
});

// Model which provides us with an interface for interacting with our data
const SubjectModel = mongoose.model('Subject', SubjectSchema);

module.exports = SubjectModel;
