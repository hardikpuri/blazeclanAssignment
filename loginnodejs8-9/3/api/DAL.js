const path = require("path");

// load sequelize object Model
const { Sequelize, DataTypes } = require("sequelize");

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

const deptModel = require(path.join(__dirname, "./../models/products"))(
  sequelize,
  Sequelize.DataTypes
);

// the class will use ES 6+ async and await code for accessing Database using
// sequelize 
class DepartmentDataAccess {

    async getProducts(req,resp){
        await sequelize.sync({force:false});
        let rows = await deptModel.findAll();
        //console.log(rows);
        rows = JSON.stringify(rows);
        console.log(rows);
        if(rows) {
           return resp.status(200).send({
                message: "Data is Read Successfully",
                rows: rows,
              });
        }
        return resp
        .status(500) // internal server error
        .send({ message: "Some Error Occured"}); 
    }


    async getProductById(req,resp){
        let id = parseInt(req.params.id);
        await sequelize.sync({force:false});
        let row = await deptModel.findOne({where:{ProductId:id}});
        if(row) {
           return resp.status(200).send({
                message: "Data is Read Successfully",
                rows: row,
              });
        }
        return resp
        .status(500) // internal server error
        .send({ message: "Some Error Occured" }); 
    }

    async addProduct(req,resp){
        const dept  = req.body;
        console.log(dept);
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
    async updateProduct(req,resp){
      const dept  = req.body;
      console.log(dept);
      await sequelize.sync({ force: false });
      let rec = deptModel.update(dept , {where:{ProductId:dept.ProductId}}); 
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
  async deleteProduct(req,resp){
    const dept  = req.params.id;
    console.log(dept);
    await sequelize.sync({ force: false });
    let rec = deptModel.destroy({where:{ProductId:dept}}); 
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














