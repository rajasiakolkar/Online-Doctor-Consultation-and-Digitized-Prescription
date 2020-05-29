const express = require('express');
const upload = require('express-fileupload');
var router = express.Router();
const bcrypt = require('bcrypt');
var ObjectId = require('mongoose').Types.ObjectId;
var Doctor = require('../model/doctor');
var checkAuth =require('../middleware/check-auth');
var ObjectId = require('mongoose').Types.ObjectId;

//get all doctors 
router.get('/' , (req, res)=>{
    Doctor.find((err,docs) => {
        if(!err) {res.send(docs);}
        else
        {console.log("Error in retriving doctors:" + JSON.stringify(err,undefined,2));}
    });
});

//get doctor through id
router.get('/:id' ,(req,res) =>{
    if(req.params.id=="")
    return res.status(400).send(`No record with given id :  ${req.params.id}`);
    
    Doctor.findOne({ doctorID: req.params.id } , (err , doc) =>
    {
        if(!err) res.send(doc);
        else
        {console.log("Error in retriving doctor:" + JSON.stringify(err,undefined,2));}
    });
});

//get doctor through specility
router.get('/sp/:id' ,(req,res) =>{
    if(req.params.id=="")
    return res.status(400).send(`No record with given id :  ${req.params.id}`);
    
    Doctor.find({ speciality: req.params.id } , (err , doc) =>
    {
        if(!err) res.send(doc);
        else
        {console.log("Error in retriving doctor:" + JSON.stringify(err,undefined,2));}
    });
});

//update doctor
router.put('/:id' , (req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record wiht given id : + ${req.params.id}`);

    var emp= {
            
            email : req.body.email,
            phone : req.body.phone,

            firstname : req.body.firstname,
            lastname : req.body.lastname,
            speciality : req.body.speciality,
            gender : req.body.gender,
            image:req.body.image, 
        
         
            degree : req.body.degree,
            college : req.body.college,
            eoc : req.body.eoc,
            eoy : req.body.eoy,
            
            clinicname : req.body.clinicname,
            cliniccity : req.body.cliniccity,
            clinicaddress : req.body.clinicaddress,
            timing:req.body.timing,
            location:req.body.location,
            fees:req.body.fees
    };

    Doctor.findByIdAndUpdate(req.params.id, {$set :emp }, {new :true} ,(err,doc)=>
    {
        if(!err) res.send(doc);
        else
        {console.log("Error in retriving Doctor:" + JSON.stringify(err,undefined,2));}
    });

});

//post images 
router.post("/images", (req, res) => {
    if (req.files) {
        var file = req.files.file;
        var filename = file.name;
        file.mv("./images/" + filename, function (err) {
            if (err) {
                console.log(err);
                res.send("error occured");
            } else {
                res.send("done");
            }
        })
    }
});

//post doctor
router.post('/',(req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const newDoctor = new Doctor({
        doctorID:req.body.doctorID,
        email: req.body.email,
        password: hash,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        typeofUser:req.body.typeofUser,
        phonenumber:req.body.phonenumber
        });
        newDoctor.save((err, doctor) => {
            if (err) {
                res.json({
                    msg: err
                });
            } else {
                res.json({
                    msg: doctor
                })
            }
        })
    });
});

//delete doctor
router.delete('/:id',checkAuth, (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record wiht given id : ${req.params.id} `);
        Doctor.deleteOne({
        doctorID: req.params.id
    }, (err, doc) => {
        if (!err) res.send(doc);
        else {
            console.log("Error in retriving employees:" + JSON.stringify(err, undefined, 2));
        }
    })
})
module.exports = router;