const express = require("express");
const cors = require("cors");
const userAccess = require('./DALuser');
const fs = require("fs");
const path = require("path");
const serverPath = path.join(__dirname, "./../views");
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
let objDal =new userAccess();
instance.get("/role/get",objDal.getRole);
instance.post("/role/create",objDal.createRole);
instance.post("/user/create",objDal.addUser);
instance.get("/user/get",objDal.getUser);
instance.post("/user/update",objDal.updateUser);
instance.delete("/user/delete/:id",objDal.deleteUser);
instance.post("/assign",objDal.assignRole);


instance.listen(9081, () => {
    console.log("REST APIs are on poty 9081");
});
  