const express = require('express');
const bcrypt = require('bcrypt');
const SubjectModel = require('../models/SubjectModel');
const router = express.Router();

// Create a subject
router.post('/', async function(req, res) {
  try {
    
    const subject = await SubjectModel.create(req.body);

    res.status(200).json({
      status: 'success',
      data: subject,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: 'error',
      message: 'An error occured while creating your subjects 😭',
    });
  }
});

// Update a subject record
router.put('/:name', async function(req, res) {
  try {
    const updatedSubject = await SubjectModel.findOneAndUpdate(
      { name: req.params.name },
      req.body,
      { new: true }
    );

    // Check if the Subject was found and updated
    if (!updatedSubject) {
      res.status(404).json({
        status: 'error',
        message: 'Sorry that subject does not exist 😭',
      });
    }

    res.json({
      status: 'success',
      data: updatedSubject,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: 'error',
      message: 'An error occured while updating the subject 😭',
    });
  }
});

// Delete a subject
router.delete('/:name', async function(req, res) {
  try {
    const deletedSubject = await SubjectModel.findOneAndDelete({
      name: req.params.name,
    });

    if (!deletedSubject) {
      res.status(404).json({
        status: 'error',
        message: 'Sorry you cannot delete a subject that does not exist',
      });
      return;
    }

    res.json({
      status: 'success',
      message: '👋🏿 successfully deleted subject',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: 'An error occured while deleting the subject',
    });
  }
});

// Get a subject by name
router.get('/:name', async function(req, res) {
  try {
    const subject = await SubjectModel.findOne({ name: req.params.name });

    // Check if a Subject was found
    if (!subject) {
      res.status(404).json({
        status: 'error',
        message: 'The subject was not found',
      });
      return;
    }

    
    
    res.json({
      status: 'success',
      data: subject,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: 'error',
      message: 'An error occured while getting the subject 😭',
    });
  }
});

// Get all subjects
router.get('', async function(req, res) {
  try {
    const search = req.query.name ? { name: req.query.name } : {};

    const subjects = await SubjectModel.find(search);
    res.json({
      status: 'succcess',
      data: subjects,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: "An error occured while getting subject's",
    });
  }
});

module.exports = router;
