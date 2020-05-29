const express = require('express');
const upload = require('express-fileupload');
var router = express.Router();
const bcrypt = require('bcrypt');
var Customer = require('../model/customer');
var checkAuth = require('../middleware/check-auth');

//get all customer
router.get('/' , (req, res)=>{
    Customer.find((err,docs) => {
        if(!err) {res.send(docs);}
        else
        {console.log("Error in retriving doctors:" + JSON.stringify(err,undefined,2));}
    });
});

//get customer through id
router.get('/:id',(req, res, next) => {
    Customer.findOne({
        customerID: req.params.id
    }, (err, customer) => {
        if (err) {
            res.json({
                msg: err
            });
        } else {
            res.json({
                customer: customer
            })
        }
    })
});

router.post('/', (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const newCustomer = new Customer({
            customerID: req.body.customerID,
            email: req.body.email,
            password: hash,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            typeofUser: req.body.typeofUser,
            phonenumber: req.body.phonenumber
        });
        newCustomer.save((err, customer) => {
            if (err) {
                res.json({
                    msg: err,
                    msgComplete: customer
                });
            } else {
                res.json({
                    msg: customer
                })
            }
        })
    });
});

router.delete('/:id', (req, res, next) => {
    Customer.deleteOne({
        customerID: req.params.id
    }, (err, result) => {
        if (err) {
            res.json(err);
        } else if (result) {
            res.json(result);
        }
    });
});

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
router.put('/:id', (req, res, next) => {
    var customer = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,       
        typeofUser: req.body.typeofUser,
        phonenumber: req.body.phonenumber,
        address: req.body.address,
        dob: req.body.dob,
        bloodGroup: req.body.bloodGroup,
        fmh: req.body.fmh,
        maritalStatus: req.body.maritalStatus,
        voluntary: req.body.voluntary,
        gender:req.body.gender,
        ifm: req.body.ifm
    };
    Customer.updateOne({
        customerID: req.params.id
    }, {
        $set: customer
    }, {
        new: true
    }, (err, doc) => {
        if (!err) res.send(doc);
        else {
            console.log("Error in retriving customers:" + JSON.stringify(err, undefined, 2));
        }
    });
});


module.exports = router;