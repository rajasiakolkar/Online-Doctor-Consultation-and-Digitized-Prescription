const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//doctor schema
 var DoctorSchema = mongoose.Schema({
        doctorID:{type: String},
        email:{type : String, unique: true},
        password:{type : String},
        firstname : {type : String},
        lastname : {type : String},
        typeofUser:{type:String},
        phonenumber:{type:String},
        speciality : {type : String},
        gender : {type : String},
        image:{type:String}, 
        degree : {type : String},
        college : {type : String},
        eoc : {type : String},
        eoy : {type : String},
        clinicname : {type : String},
        cliniccity : {type : String},
        clinicaddress : {type : String},
        timing:{type:Object},
        location:{type:Object},
        fees:{type:Number}
 });

 DoctorSchema.plugin(uniqueValidator);
 module.exports = mongoose.model('Doctor', DoctorSchema);