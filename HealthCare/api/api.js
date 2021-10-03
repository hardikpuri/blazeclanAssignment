const express = require("express");
const cors = require("cors");
const path = require("path");
const userDAL = require('./DAL/userDAL');
const doctorDAL = require('./DAL/doctorDAL');
const staffDAL = require('./DAL/staffDAL');
const wardDAL = require('./DAL/wardDAL');
const patientDAL = require('./DAL/patientDAL');
const nurseDAL = require('./DAL/nurseDAL');
const instance = express();
instance.use(express.urlencoded({ extended: false }));
instance.use(express.json());
instance.use(
  cors({
    origin: "*",
    allowedHeaders: "*",
    methods: "*",
  })
);

let userobj = new userDAL();
let doctorobj = new doctorDAL();
let staffobj = new staffDAL();
let wardobj = new wardDAL();
let patientobj = new patientDAL();
let nurseobj = new nurseDAL();
instance.post("/userLogin", userobj.authUser);
instance.post("/doctorLogin",userobj.authdoctor);
instance.post("/nurseLogin",userobj.authNurse);
instance.put("/user/add",userobj.addUser);
instance.get("/user/get",userobj.getData);

instance.put("/doctor/add",doctorobj.addDoctor);
instance.get("/doctor/list",doctorobj.getData);
instance.get("/doctor/instaff",doctorobj.doctoronlyinstaff);
instance.get("/doctor/name",doctorobj.getDoctorName);
instance.get("/doctor/bystaffid/:staffno",doctorobj.getDatabystaff);

instance.get("/patient/list",patientobj.getData);
instance.put("/patient/add",patientobj.addPatient);
instance.get("/patient/bydoctorid/:id",patientobj.getDatabydid)


instance.get("/staff/list",staffobj.getData);
instance.get("/staff/notuser",staffobj.staffnotuser);
instance.get("/staff/getbyid/:id",staffobj.getDatabyid);
instance.post("/staff/update",staffobj.update);
instance.put("/staff/add",staffobj.addStaff);
instance.get("/staff/doctor/:staffno",staffobj.getDatabyid);

instance.get("/ward/list", wardobj.getWard);

instance.get("/nurse/list",nurseobj.getData);
instance.get("/nurse/instaff",nurseobj.nurseonlyinstaff);
instance.put("/nurse/add",nurseobj.addNurse);
instance.get("/nurse/ward/:id",nurseobj.getWard);
instance.get("/nurse/wardPatient/:id",nurseobj.getWardPatient);

instance.listen(9081, () => {
    console.log("REST APIs are on poty 9081");
  });
  