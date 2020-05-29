// appointment model
export interface appointment{
    _id:string;
    customerID:string;
    doctorID:string;
    appointment_date:string;
    appointment_time:number;
    appointment_value:string;
    customer_name:string;
    doctor_name:string;
    prescription:string;
}