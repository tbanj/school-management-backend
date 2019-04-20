const express = require('express');
const bcrypt = require('bcrypt');
const TeacherModel = require('../models/TeacherModel');
const router = express.Router();

// Create a teacher
router.post('/', async function(req, res) {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);

    const teacher = await TeacherModel.create(req.body);

    res.status(200).json({
      status: 'success',
      data: teacher,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: 'error',
      message: 'An error occured while creating your account 😭',
    });
  }
});

// Update a teacher
router.put('/:email', async function(req, res) {
  try {
    const updatedTeacher = await TeacherModel.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }
    );

    // Check if the Teacher was found and updated
    if (!updatedTeacher) {
      res.status(404).json({
        status: 'error',
        message: 'Sorry that teacher does not exist 😭',
      });
    }

    res.json({
      status: 'success',
      data: updatedTeacher,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: 'error',
      message: 'An error occured while updating the teacher 😭',
    });
  }
});

// Delete a teacher
router.delete('/:email', async function(req, res) {
  try {
    const deletedTeacher = await TeacherModel.findOneAndDelete({
      email: req.params.email,
    });

    if (!deletedTeacher) {
      res.status(404).json({
        status: 'error',
        message: 'Sorry you cannot delete a teacher that does not exist',
      });
      return;
    }

    res.json({
      status: 'success',
      message: '👋🏿 successfully deleted teacher',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: 'An error occured while deleting the teacher',
    });
  }
});

// Get a teacher by email
router.get('/:email', async function(req, res) {
  try {
    const teacher = await TeacherModel.findOne({ email: req.params.email });

    // Check if a Teacher was found
    if (!teacher) {
      res.status(404).json({
        status: 'error',
        message: 'The teacher was not found',
      });
      return;
    }

    res.json({
      status: 'success',
      data: teacher,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: 'error',
      message: 'An error occured while getting the teacher 😭',
    });
  }
});

// Get all teachers
router.get('', async function(req, res) {
  try {
    const search = req.query.gender ? { gender: req.query.gender } : {};

    const teachers = await TeacherModel.find(search);
    res.json({
      status: 'succcess',
      data: teachers,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: "An error occured while getting teacher's",
    });
  }
});

module.exports = router;
