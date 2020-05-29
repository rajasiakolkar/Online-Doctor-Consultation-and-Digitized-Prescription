// doctor model
export class Doctor {
   _id:string;
   doctorID: string;
   email:string ;
   password:string;
   phonenumber:string;
   firstname : string;
   lastname : string;
   speciality : string;
   gender : string ;
   image:string;
   degree : string;
   college : string;
   eoc : string;
   eoy : string ; 
   clinicname: string;
   cliniccity: string;
   clinicaddress: string;
   timing:Doctortime;
   location:Location;
   fees:number;

}

// export class Demo{
//    firstname : String;
//    lastname : String;
//    speciality : String;
//    gender : String ;
// }

// export class Education
// {
//    degree : String;
//    college : String;
//    eoc : String;
//    eoy : String ;
// }

//location model
export interface Location
{
  longitude:number;
  latitude:number;
}

// doctortime model
export interface Doctortime
{
  mon:day;
  tue:day;
  wed:day;
  thu:day;
  fri:day;
  sat:day;
  sun:day;
}

// day model
export interface day
{
  from:number; to:number;
}

//clinic model
export interface clinic{
  clinicname:string;
  cliniccity:string;
  clinicaddress:string ;
}

// appointment model
 export interface appointment{
   customerID:string;
   doctorID:string;
   appointment_date:string;
   appointment_time:string;
 }