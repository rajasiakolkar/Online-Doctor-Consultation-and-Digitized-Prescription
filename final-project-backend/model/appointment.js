const mongoose=require('mongoose');

// appointment schema
const AppointmentSchema=mongoose.Schema({
  customerID:{
    type:String,
    required:true
  },
  doctorID:{
    type:String,
    required:true
  },
  appointment_date:{
    type:String,
    required:true
  },
  appointment_time:{
    type:Number,
    required:true
  },
  appointment_value:{
    type:String,
    required:true
  }
  ,customer_name:{
    type:String,
    required:true
  },
  doctor_name:{
    type:String,
    required:true
  },
  prescription:String
});

module.exports=mongoose.model('Appointment',AppointmentSchema);


