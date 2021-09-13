const express = require("express");
const cors = require("cors");
const dataAccess = require('./DAL.js');
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
instance.use(express.static(path.join(__dirname + './../js')));
instance.use(express.static(path.join(__dirname + './../views')));
let router = express.Router();
instance.use(
    express.static(path.join(__dirname, './../../node_modules/bootstrap/dist/css'))
);
instance.use(router);
router.get('/home', (req,resp)=>{
    // respond the file using 'sendFile()'
    resp.sendFile('home.html', {
        root: path.join(__dirname, './../views')
    });
});
// router.get('/bootstrap.min.css', (req,resp)=>{
//     // respond the file using 'sendFile()'
//     resp.sendFile('bootstrap.min.css', {
//         root: path.join(__dirname, './../../node_modules/bootstrap/dist/css')
//     });
// });
router.get('/up&del', (req,resp)=>{
    // respond the file using 'sendFile()'
    resp.sendFile('up&del.html', {
        root: path.join(__dirname, './../views')
    });
});
router.get('/up&del.js', (req,resp)=>{
    // respond the file using 'sendFile()'
    resp.sendFile('up&del.js', {
        root: path.join(__dirname, './../views')
    });
});
router.get('/addProduct', (req,resp)=>{
    // respond the file using 'sendFile()'
    resp.sendFile('addProduct.html', {
        root: path.join(__dirname, './../views')
    });
});
router.get('/login.js', (req,resp)=>{
    // respond the file using 'sendFile()'
    resp.sendFile('login.js', {
        root: path.join(__dirname, './../js')
    });
});
router.get('/login', (req,resp)=>{
    // respond the file using 'sendFile()'
    resp.sendFile('login.html', {
        root: path.join(__dirname, './../views')
    });
});
// define an instance of the DataAccess
let objDal =new dataAccess();
let userDal = new userAccess();

// REST API with callback
// the calback methdo will be passed with request,response object 
instance.put("/api/addProduct", objDal.addProduct);
instance.delete("/api/deleteProduct/:id", objDal.deleteProduct);
instance.put("/api/updateProduct", objDal.updateProduct);
instance.get("/api/product/:id", objDal.getProductById);
instance.get("/api/products", objDal.getProducts);
instance.get("/api/verify/:id" , userDal.getUserById);


//instance.get("/api/departments/:id", objDal.getDepartmentById);
//instance.post("/api/departments", objDal.createDepartment);



instance.listen(9081, () => {
    console.log("REST APIs are on poty 9081");
  });
  