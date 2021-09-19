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

const roleModel = require(path.join(__dirname, "./models/role"))(
  sequelize,
  Sequelize.DataTypes
);
const userinroleModel = require(path.join(__dirname, "./models/userinrole"))(
  sequelize,
  Sequelize.DataTypes
);
const userModel = require(path.join(__dirname, "./models/user"))(
  sequelize,
  Sequelize.DataTypes
);
// the class will use ES 6+ async and await code for accessing Database using
// sequelize 
class roleDataAccess {
    async getRole(req,resp){
        await sequelize.sync({force:false});
        let rows = await roleModel.findAll();
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
    async createRole(req,resp){
        const role  = req.body;
        await sequelize.sync({ force: false });
        let rec = roleModel.create(role); 
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

    //user

    async getUser(req,resp){
      await sequelize.sync({force:false});
      let rows = await sequelize.query("select userid,username from user;");
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


    async getUserById(req,resp){
      let id = parseInt(req.params.id);
      await sequelize.sync({force:false});
      let row = await userModel.findOne({where:{userid:id}});
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
    getuserid(authHeader) {
      let credentials = authHeader.split(" ")[1];
      console.log(`Credentials ${credentials}`);
      let userName = credentials.split(":")[0]; // UserName
      let password = credentials.split(":")[1]; // PAssword
      console.log(userName);
      console.log(password);
      //sequelize.sync({force:false});
      let rows = userModel.findOne({where:{username:userName,password:password}});
      console.log(`------------------ ${rows}`);
      return rows.userid;
    };
    getroleid(userid){
      //sequelize.sync({force:false});
      let rows = userinroleModel.findOne({where:{userid:userid}});
      console.log(`------------------${rows.roleid}`);
      //sequelize.sync({force:false});
      rows = roleModel.findOne({where:{roleid:rows.roleid}});
      console.log(`------------------${rows.role}`);
      return rows.role;
    }
    async addUser(req,resp){
      let authHeader = req.headers.authorization;
      console.log(`AUTH Headers ${authHeader}`);
      let credentials = authHeader.split(" ")[1];
      console.log(`Credentials ${credentials}`);
      let userName = credentials.split(":")[0]; // UserName
      let password = credentials.split(":")[1]; // PAssword
      console.log(userName);
      console.log(password);
      sequelize.sync({force:false});
      let rows = await userModel.findOne({where:{username:userName,password:password}});
      console.log(`------------------ ${rows}`);
      sequelize.sync({force:false});
      rows = await userinroleModel.findOne({where:{userid:rows.userid}});
      console.log(`------------------${rows}`);
      sequelize.sync({force:false});
      rows = await roleModel.findOne({where:{roleid:rows.roleid}});
      console.log(`------------------${rows.role}`);
      let role = rows.role;
      if(role === "Admin" || role === "Manager"){
        const dept  = req.body;
        console.log(dept);
        await sequelize.sync({ force: false });
        let rec = userModel.create(dept); 
        if(rec){
          return resp.status(200).send({
            message: "Data is Added Successfully",
            rows: rec,
          });
        }
        return resp
            .status(500)  
            .send({ message: "Some Error Occured" }); 
      }else{
        return resp
            .status(500)  
            .send({ message: "You cannot add user" }); 
      }
    }


    async updateUser(req,resp){
      let authHeader = req.headers.authorization;
      console.log(`AUTH Headers ${authHeader}`);
      let credentials = authHeader.split(" ")[1];
      console.log(`Credentials ${credentials}`);
      let userName = credentials.split(":")[0]; // UserName
      let password = credentials.split(":")[1]; // PAssword
      console.log(userName);
      console.log(password);
      sequelize.sync({force:false});
      let rows = await userModel.findOne({where:{username:userName,password:password}});
      console.log(`------------------ ${rows}`);
      sequelize.sync({force:false});
      rows = await userinroleModel.findOne({where:{userid:rows.userid}});
      console.log(`------------------${rows}`);
      sequelize.sync({force:false});
      rows = await roleModel.findOne({where:{roleid:rows.roleid}});
      console.log(`------------------${rows.role}`);
      let role = rows.role;
      if(role === "Admin" || role === "Manager"){
        const dept  = req.body;
      console.log(dept);
      await sequelize.sync({ force: false });
      let rec = userModel.update(dept , {where:{userid:dept.userid}}); 
      if(rec){
        return resp.status(200).send({
          message: "Data is updated Successfully",
          rows: rec,
        });
      }
      return resp
          .status(500)  
          .send({ message: "Some Error Occured" }); 
        }else{
          return resp
          .status(500)  
          .send({ message: "you cant update the user" });  
        }
    }


    async deleteUser(req,resp){
      let authHeader = req.headers.authorization;
      console.log(`AUTH Headers ${authHeader}`);
      let credentials = authHeader.split(" ")[1];
      console.log(`Credentials ${credentials}`);
      let userName = credentials.split(":")[0]; // UserName
      let password = credentials.split(":")[1]; // PAssword
      console.log(userName);
      console.log(password);
      sequelize.sync({force:false});
      let rows = await userModel.findOne({where:{username:userName,password:password}});
      console.log(`------------------ ${rows}`);
      sequelize.sync({force:false});
      rows = await userinroleModel.findOne({where:{userid:rows.userid}});
      console.log(`------------------${rows}`);
      sequelize.sync({force:false});
      rows = await roleModel.findOne({where:{roleid:rows.roleid}});
      console.log(`------------------${rows.role}`);
      let role = rows.role;
      if(role === "Admin"){
        const dept  = req.params.id;
        console.log(dept);
        await sequelize.sync({ force: false });
        let rec = userModel.destroy({where:{userid:dept}}); 
        if(rec){
          return resp.status(200).send({
            message: "Data is Deleted Successfully",
            rows: rec,
          });
        }
          return resp
            .status(500)  
            .send({ message: "Some Error Occured" }); 
        }else{
          return resp
          .status(500)  
          .send({ message: "only admin can del user" }); 
        }
    }

    async assignRole(req,resp){
      console.log("in assign");
      const dept  = req.body;
      console.log(dept);
      await sequelize.sync({ force: false });
      let rec = userinroleModel.create(dept); 
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
module.exports = roleDataAccess;
