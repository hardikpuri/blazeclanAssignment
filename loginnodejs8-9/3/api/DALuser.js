const path = require("path");

// load sequelize object Model
const { Sequelize, DataTypes, and } = require("sequelize");

const sequelize = new Sequelize("product", "root", "Blaze@12345", {
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

const deptModel = require(path.join(__dirname, "./../models/user"))(
  sequelize,
  Sequelize.DataTypes
);

// the class will use ES 6+ async and await code for accessing Database using
// sequelize 
class DepartmentDataAccess {

    async getUser(req,resp){
        await sequelize.sync({force:false});
        let rows = await deptModel.findAll();
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


    async getUserById(req,resp){
        let id = req.params.id;
        console.log(id);
        await sequelize.sync({force:false});
        let row = await deptModel.findOne({where:{username:id}});
        if(row) {
           return resp.status(200).send(
            {
                message: "Data is Read Successfully",
                rows: row,
            }
           );
        }
        return resp
        .status(500) // internal server error
        .send({ message: "Some Error Occured" }); 
    }

    async createUser(req,resp){
        const dept  = req.body;
        await sequelize.sync({ force: false });
        let rec = deptModel.create(dept); 
       if(rec){
          return resp.status(200).send({
            message: "Data is Added Successfully",
            rows: rec,
          });
        }
    
         return resp
            .status(500)  
            .send({ message: "Some Error Occured" }); 
    }
}
module.exports = DepartmentDataAccess;
