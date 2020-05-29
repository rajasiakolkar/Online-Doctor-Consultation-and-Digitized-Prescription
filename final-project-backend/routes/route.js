const express = require('express');
var router = express.Router();


const Appointment=require('../model/appointment');

/*Start Appointment Routes*/ 

//retrieving appointment data
router.get('/appointment', (req, res, next) => {
    Appointment.find((err, appointment) => {
        res.json(appointment);
    })
});

//adding Appointment data
router.post('/appointment', (req, res, next) => {
    const newAppointment = new Appointment({
        user_id: req.body.user_id,
        doctor_id: req.body.doctor_id,
        appointment_date: req.body.appointment_date,
        appointment_time: req.body.appointment_time
    });
    newAppointment.save((err, appointment) => {
        if (err) {
            res.json({
                msg: 'Failed to connect'
            });
        } else {
            res.json({
                msg: appointment
            })
        }
    })
});

//delete Appointment

router.delete('/appointment/:id', (req, res, next) => {
    Appointment.deleteOne({
        _id: req.params.id
    }, (err, result) => {
        if (err) {
            res.json(err);
        } else if (result) {
            res.json(result);
        }
    });
});

/*End Appointment Routes*/
module.exports = router;