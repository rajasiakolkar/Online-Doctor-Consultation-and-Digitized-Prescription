const express = require('express');
var router = express.Router();
var  Appointment = require('../model/appointment');
var ObjectId = require('mongoose').Types.ObjectId;

//get all appointment 
router.get('/' , (req, res)=>{
    Appointment.find((err,docs) => {
        if(!err) {res.send(docs);}
        else
        {console.log("Error in retriving appointment:" + JSON.stringify(err,undefined,2));}
    });
});

//get appointment through doctorid
router.get('/:id' ,(req,res) =>{
    if(req.params.id=="")
    return res.status(400).send(`No record with given id :  ${req.params.id}`);
    
    Appointment.find({ doctorID: req.params.id }, (err , doc) =>
    {
        if(!err) res.send(doc);
        else
        {console.log("Error in retriving appointment:" + JSON.stringify(err,undefined,2));}
    });
});

//get appointment through id 
router.get('/one/:id' ,(req,res) =>{
    if(req.params.id=="")
    return res.status(400).send(`No record with given id :  ${req.params.id}`);
    
    Appointment.findById( req.params.id , (err , doc) =>
    {
        if(!err) res.send(doc);
        else
        {console.log("Error in retriving appointment:" + JSON.stringify(err,undefined,2));}
    });
});

//get appointment through cutomer id 
router.get('/cust/:id' ,(req,res) =>{
    if(req.params.id=="")
    return res.status(400).send(`No record with given id :  ${req.params.id}`);
    
    Appointment.find({ customerID: req.params.id }, (err , doc) =>
    {
        if(!err) res.send(doc);
        else
        {console.log("Error in retriving appointment:" + JSON.stringify(err,undefined,2));}
    });
});

router.get('/time/:time/date/:date/doctor/:doctor' ,(req,res) =>{
    if(req.params.time=="")
    return res.status(400).send(`No record with given id :  ${req.params.id}`);
    Appointment.find({ doctorID: req.params.doctor, appointment_date:req.params.date, appointment_time:req.params.time }, (err , doc) =>
    {
        if(!err) res.send(doc);
        else
        {console.log("Error in retriving appointment:" + JSON.stringify(err,undefined,2));}
    });
});

router.post('/',(req, res, next) => {
    
        const newappointment = new Appointment({
        customerID: req.body.customerID,
        doctorID:req.body.doctorID,
        appointment_date: req.body.appointment_date,
        appointment_time: req.body.appointment_time,
        appointment_value: req.body.appointment_value,
        customer_name:req.body.customer_name,
        doctor_name:req.body.doctor_name,
        prescription:req.body.prescription
        });
        newappointment.save((err, appointment) => {
            if (err) {
                res.json({
                    msg: err
                });
            } else {
                res.json({
                    msg: appointment
                })
            }
        })
    
});

router.put('/:id' , (req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record wiht given id : + ${req.params.id}`);
    var newappointment= {
        customerID: req.body.customerID,
        doctorID:req.body.doctorID,
        appointment_date: req.body.appointment_date,
        appointment_time: req.body.appointment_time,
        appointment_value: req.body.appointment_value,
        customer_name:req.body.customer_name,
        doctor_name:req.body.doctor_name,
        prescription:req.body.prescription
        };

    Appointment.findByIdAndUpdate(req.params.id, {$set :newappointment }, {new :true} ,(err,doc)=>
    {
        if(!err) res.send(doc);
        else
        {console.log("Error in retriving Doctor:" + JSON.stringify(err,undefined,2));}
    });

});


module.exports = router;