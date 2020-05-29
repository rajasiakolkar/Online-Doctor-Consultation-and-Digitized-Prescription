const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
//user schema
 var UserSchema = mongoose.Schema({
        email:{type : String, unique: true},
        password:{type : String},
        firstname : {type : String},
        lastname : {type : String},
        typeofUser:{type:String},
        phonenumber:{type:String},    
 });

 UserSchema.plugin(uniqueValidator);
 module.exports = mongoose.model('User', UserSchema);