const path = require("path");

// load sequelize object Model
const { Sequelize, DataTypes, and } = require("sequelize");

const sequelize = new Sequelize("userrole", "root", "Blaze@12345", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    min: 0,
    max: 5,
    idle: 10000,
  },
  define: {
    timestamps: false,
  },
});
const productModel = require(path.join(__dirname, "./models/product"))(
  sequelize,
  Sequelize.DataTypes
);
const userModel = require(path.join(__dirname, "./models/user"))(
    sequelize,
    Sequelize.DataTypes
  );
class productCrud{
    async getProduct(req,resp){
        await sequelize.sync({force:false});
        let rows = await productModel.findAll();
        if(rows) {
           return resp.status(200).send({
                message: "Data is Read Successfully",
                rowCount: rows.length,
                rows: rows,
              });
        }
        return resp
        .status(500) // internal server error
        .send({ message: "Some Error Occured"}); 
    }
    async addProduct(req,resp){
        let authHeader = req.headers.authorization;
        console.log(`AUTH Headers ${authHeader}`);
        let credentials = authHeader.split(" ")[1];
        console.log(`Credentials ${credentials}`);
        let userName = credentials.split(":")[0]; // UserName
        let password = credentials.split(":")[1]; // PAssword
        await sequelize.sync({force:false});
        let rows = await userModel.findOne({where:{username:userName,password:password}});
        let rows = await roleModel.create();
        if(rows) {
           return resp.status(200).send({
                message: "Data is added Successfully",
                rowCount: rows.length,
                rows: rows,
              });
        }
        return resp
        .status(500) // internal server error
        .send({ message: "Some Error Occured"}); 
    }
}