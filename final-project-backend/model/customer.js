const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//customer schema
const CustomerSchema = mongoose.Schema({
        customerID: {type: String},
        email:{type : String, unique: true},
        password:{type : String},
        firstname : {type : String},
        lastname : {type : String},
        typeofUser:{type:String},
        phonenumber:{type:String},
        gender:{type: String},
        ifm:{type:String},
        address: {type:String},
        dob: {type:String},
        bloodGroup: {type:String},
        fmh: {type:String},
        maritalStatus: {type:String},
        voluntary: {type:String}
});
CustomerSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Customer', CustomerSchema);