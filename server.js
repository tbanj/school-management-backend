const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TeacherRoute = require('./routes/TeacherRoute');
const SubjectRoute = require('./routes/SubjectRoute');


const app = express();

// Connect to MongoDB
// make use of ip 192.168.99.100 cos it correspond to d docker-machine ip  i have
mongoose
  .connect('mongodb://192.168.99.100:27017/school-management')
  .then(() => {
    console.log('✌🏾 Successfully connected to MongoDB');
  })
  .catch(err => {
    console.log('An error occured while conencting to MongoDB', err);
  });

app.use(cors());

// Add middlewares for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/teacher', TeacherRoute);
app.use('/subject', SubjectRoute);

app.listen(6004).on('listening', () => {
  console.log('We are live on ' + 6004);
});
