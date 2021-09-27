const express = require("express");
const cors = require("cors");
const path = require("path");
const userDAL = require('./DAL/userDAL');
const doctorDAL = require('./DAL/doctorDAL');
const staffDAL = require('./DAL/staffDAL');
const wardDAL = require('./DAL/wardDAL');
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
instance.post("/userLogin", userobj.authUser);
instance.post("/doctorLogin",userobj.authdoctor);
instance.get("/doctor/list",doctorobj.getData);

instance.get("/staff/list",staffobj.getData);
instance.get("/staff/getbyid/:id",staffobj.getDatabyid);
instance.post("/staff/update",staffobj.update);
instance.put("/staff/add",staffobj.addStaff);

instance.get("/ward/list", wardobj.getWard);


instance.listen(9081, () => {
    console.log("REST APIs are on poty 9081");
  });
  