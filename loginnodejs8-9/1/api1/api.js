const express = require("express");
const cors = require("cors");
const dal = require("./dataaccess");

const instance = express();

// COnfigure Middlewares
// for reading headers
instance.use(express.urlencoded({ extended: false }));
// parse json
instance.use(express.json());
// configure cors

instance.use(
  cors({
    origin: "*", // all oriogins are allowd OR specify orogins as per your demand
    allowedHeaders: "*", // allow all headers OR specifiy headers
    methods: "*", // allow all method OR specify http methods
  })
);

// instance of DataAccess classes
const dalObject = new dal();
// instance.get("/api/products", (req, resp) => {
//   let user = dalObject.getUserName();
//   resp.status(200).send({ data: user });
// });

// API method for get request
instance.get("/api/products", (req, resp) => {
  let products = dalObject.getProducts();
  resp.status(200).send({ data: products });
});

instance.get("/api/auth/products", (req, resp) => {
  // read authorization Headers
  let authHeader = req.headers.authorization;
  console.log(`AUTH Headers ${authHeader}`);
  // read crdentials
  // Basic UserName:Password
  let credentials = authHeader.split(" ")[1];
  console.log(`Credentials ${credentials}`);
  let userName = credentials.split(":")[0]; // UserName
  let password = credentials.split(":")[1]; // PAssword
  if (userName === "mahesh" && password === "mahesh") {
    let products = dalObject.getProducts();
    resp.status(200).send({ data: products });
  } else {
    resp.status(401).send({ message: "Credentials are invalid" });
  }
});

// the get request with id
// parameter(s) can be set using :[NAME]
// http://localhost:9081/api/products/Prd-001
instance.get("/api/products/:id", (req, resp) => {
  // read the header id
  let id = req.params.id;
  console.log(id);
  let product = dalObject.getProductsById(id);
  if (product == null || product === undefined || !product) {
    resp.status(404).send({ message: "Record not found, it may be deleted" });
  } else {
    resp.status(200).send({ data: product });
  }
});

// The Post request
instance.post("/api/products", (req, resp) => {
  // read data from body.
  let authHeader = req.headers.authorization;
  console.log(`AUTH Headers ${authHeader}`);
  let credentials = authHeader.split(" ")[1];
  console.log(`Credentials ${credentials}`);
  let userName = credentials.split(":")[0]; // UserName
  let password = credentials.split(":")[1]; // PAssword
  let user = dalObject.getUserName(userName,password);
  if(user.length>0){
    let product = req.body;
    console.log(`Received data from Body ${JSON.stringify(product)}`);
    let products = dalObject.createProduct(product);
    resp.status(200).send({ data: products });
  }
  else{
    resp.status(404).send({ message: "Unauthroze access" });
  }
});

instance.put("/api/products/:id", (req, resp) => {
  let authHeader = req.headers.authorization;
  console.log(`AUTH Headers ${authHeader}`);
  let credentials = authHeader.split(" ")[1];
  console.log(`Credentials ${credentials}`);
  let userName = credentials.split(":")[0]; // UserName
  let password = credentials.split(":")[1]; // PAssword
  let user = dalObject.getUserName(userName,password);
  if(user.length>0){
    let id = req.params.id;
    let product = req.body;
    let products = dalObject.updateProduct(product,id);
    resp.status(200).send({ data: products });
  }
  else{
    resp.status(404).send({ message: "Unauthroze access" });
  }
  // logic
  // read header and search record, if found read data from body and update the array and send response
  // if id is empty or record not found generate errro occrdingly
});

instance.delete("/api/products/:id", (req, resp) => {
  let authHeader = req.headers.authorization;
  console.log(`AUTH Headers ${authHeader}`);
  let credentials = authHeader.split(" ")[1];
  console.log(`Credentials ${credentials}`);
  let userName = credentials.split(":")[0]; // UserName
  let password = credentials.split(":")[1]; // PAssword
  let user = dalObject.getUserName(userName,password);
  console.log(user);
  if(user.length>0){
    let id = req.params.id;
    console.log(id);
    console.log("in delete");
    let product = dalObject.delete(id);
    if (product == null || product === undefined || !product) {
      resp.status(404).send({ message: "Record not found, it may be deleted" });
    } else {
      resp.status(200).send({ data: product });
    }
  }
  else{
    resp.status(404).send({ message: "Unauthroze access" });
  }
  // logic
  // read header and search record,delete record and send response accordingly
  // if id is empty or record not found generate errro occrdingly
});

instance.listen(9081, () => {
  console.log("REST APIs are on poty 9081");
});
