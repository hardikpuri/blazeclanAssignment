const express = require("express");
const cors = require("cors");
const path = require("path");
const userDAL = require('./DAL/userDAL');
const doctorDAL = require('./DAL/doctorDAL');
const staffDAL = require('./DAL/staffDAL');
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
instance.post("/userLogin", userobj.authUser);
instance.get("/doctor/list",doctorobj.getData);
instance.get("/staff/Doctor",staffobj.getdoctor);
instance.listen(9081, () => {
    console.log("REST APIs are on poty 9081");
  });
  