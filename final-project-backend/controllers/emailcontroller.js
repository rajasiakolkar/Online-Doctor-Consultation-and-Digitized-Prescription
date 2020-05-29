
const express = require('express');
const upload = require('express-fileupload');
var router = express.Router();
const bcrypt = require('bcrypt');
var ObjectId = require('mongoose').Types.ObjectId;
var Doctor = require('../model/doctor');
var checkAuth =require('../middleware/check-auth');
var ObjectId = require('mongoose').Types.ObjectId;
var nodemailer = require('nodemailer');

router.get('/:time/dname/:dname/date/:date',(req,res)=>{
 
// send email  
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tanwar.neu2018@gmail.com',
    pass: 'janu12345'
  }
});

var mailOptions = {
  from: 'tanwar.neu2018@gmail.com',
  to: 'puneet.tanwar1394@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'Appointment Conformation',
  html: '<b> Appointment Conformation </b>  <p> Your appointment is booked with Dr.' +req.params.dname+' at ' +req.params.time  +'  on  ' + req.params.date+' </p> '
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

})
module.exports = router;