const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var router = express.Router();


const User = require('../model/user');

//login authentication
router.post('/', (req, res, next) => {
    let fetchedUser;
    User.findOne({
        email: req.body.email_id
    }).then(user => {
        if (!user) {
            return res.json({
                msg: 'No User Found'
            });
        }
        fetchedUser = user;  
        return bcrypt.compare(req.body.password, user.password);     
    }).then(result => {
        if (!result) {
            return res.json({
                msg: 'Invalid User'
            });
        }
        const token = jwt.sign({
            email: fetchedUser.email,
            userID: fetchedUser._id,
        }, 'secret_this_should_be_long', {
            expiresIn: '1h'
        });
        res.status(200).json({
            token: token,
            userID:fetchedUser._id,
            type: fetchedUser.typeofUser,
            msg:''
        });
    }).catch(err => {
        return res.status(401).json({
            msg: 'Invalid User'
        })
    });
})

module.exports = router;
