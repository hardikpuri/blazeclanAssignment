const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");
const jwt = require("jsonwebtoken");
const { decode } = require("punycode");
const { create } = require("domain");
const jwtSettings = {
    jwtSecret: "utfsbibombmwwmb0987887890bmwwmbmobibsftu",
};
const sequelize = new Sequelize("hospital", "root", "Blaze@12345", {
    host: "localhost",
    dialect: "mysql",
});
const nurseModel = require(path.join(__dirname, "./../models/nurse"))(
    sequelize,
    Sequelize.DataTypes
);
const patientModel = require(path.join(__dirname, "./../models/patient"))(
    sequelize,
    Sequelize.DataTypes
);
class nurse {

    async addNurse(req, resp){
        console.log(req.body);
        if (req.headers.authorization !== undefined) {
            let receivedToken = req.headers.authorization.split(" ")[1];
            console.log(receivedToken);
            await jwt.verify(
                receivedToken,
                jwtSettings.jwtSecret,
                async (error, decode) => {
                    if (error)
                        return resp.status(401).send({
                            response: `AUthorization failed`,
                        });
                    // set the decode property of the request to provide the status of the token verification
                    req.decode = decode;
                    let nurse = req.body;
                    await sequelize.sync({ force: false });
                    let data = await nurseModel.create(nurse);
                    console.log(data);
                    return resp.status(200).send({ message: data });
                }
            );
        } else {
            return resp.status(401).send({
                response: `AUthorization failed, no AUTHORIZATION header present in the request`,
            });
        }
    }
    
    async getData(req, resp) {
        console.log(req.headers.authorization);
        if (req.headers.authorization !== undefined) {
            let receivedToken = req.headers.authorization.split(" ")[1];
            console.log(receivedToken);
            await jwt.verify(
                receivedToken,
                jwtSettings.jwtSecret,
                async (error, decode) => {
                    if (error)
                        return resp.status(401).send({
                            response: `AUthorization failed`,
                        });
                    // set the decode property of the request to provide the status of the token verification
                    req.decode = decode;
                    await sequelize.sync({ force: false });
                    let data = await sequelize.query("SELECT * FROM nurse INNER JOIN staff ON nurse.staffNo = staff.staffNo;" , { type: sequelize.QueryTypes.SELECT});
                    console.log(data);
                    return resp.status(200).send({ message: data });
                }
            );
        } else {
            return resp.status(401).send({
                response: `AUthorization failed, no AUTHORIZATION header present in the request`,
            });
        }
    }


    async getNurseName(req, resp) {
        //console.log(req.headers.authorization);
        if (req.headers.authorization !== undefined) {
            let receivedToken = req.headers.authorization.split(" ")[1];
            console.log(receivedToken);
            await jwt.verify(
                receivedToken,
                jwtSettings.jwtSecret,
                async (error, decode) => {
                    if (error)
                        return resp.status(401).send({
                            response: `AUthorization failed`,
                        });
                    // set the decode property of the request to provide the status of the token verification
                    req.decode = decode;
                    await sequelize.sync({ force: false });
                    let data = await sequelize.query("select FirstName,LastName,DoctorId from staff,doctor where staff.StaffNo = doctor.StaffNo;" , { type: sequelize.QueryTypes.SELECT});
                    console.log(data);
                    return resp.status(200).send({ message: data });
                }
            );
        } else {
            return resp.status(401).send({
                response: `AUthorization failed, no AUTHORIZATION header present in the request`,
            });
        }
    }

    async nurseonlyinstaff(req, resp) {
        //console.log(req.headers.authorization);
        if (req.headers.authorization !== undefined) {
            let receivedToken = req.headers.authorization.split(" ")[1];
            console.log(receivedToken);
            await jwt.verify(
                receivedToken,
                jwtSettings.jwtSecret,
                async (error, decode) => {
                    if (error)
                        return resp.status(401).send({
                            response: `AUthorization failed`,
                        });
                    // set the decode property of the request to provide the status of the token verification
                    req.decode = decode;
                    await sequelize.sync({ force: false });
                    let data = await sequelize.query("SELECT StaffNo,FirstName,LastName FROM staff where Designation = 'Nurse' and StaffNo NOT IN (select StaffNo from nurse);" , { type: sequelize.QueryTypes.SELECT});
                    console.log(data);
                    return resp.status(200).send({ message: data });
                }
            );
        } else {
            return resp.status(401).send({
                response: `AUthorization failed, no AUTHORIZATION header present in the request`,
            });
        }
    }

    async getWard(req, resp) {
        //console.log(req.headers.authorization);
        if (req.headers.authorization !== undefined) {
            let receivedToken = req.headers.authorization.split(" ")[1];
            console.log(receivedToken);
            await jwt.verify(
                receivedToken,
                jwtSettings.jwtSecret,
                async (error, decode) => {
                    if (error)
                        return resp.status(401).send({
                            response: `AUthorization failed`,
                        });
                    // set the decode property of the request to provide the status of the token verification
                    req.decode = decode;
                    await sequelize.sync({ force: false });
                    let data = await sequelize.query(`SELECT WardId, WardName FROM ward where WardId = (select WardNo from nurse where StaffNo = ${req.params.id});` , { type: sequelize.QueryTypes.SELECT});
                    console.log(data);
                    return resp.status(200).send({ message: data });
                }
            );
        } else {
            return resp.status(401).send({
                response: `AUthorization failed, no AUTHORIZATION header present in the request`,
            });
        }
    }

    async getWardPatient(req, resp) {
        //console.log(req.headers.authorization);
        if (req.headers.authorization !== undefined) {
            let receivedToken = req.headers.authorization.split(" ")[1];
            console.log(receivedToken);
            await jwt.verify(
                receivedToken,
                jwtSettings.jwtSecret,
                async (error, decode) => {
                    if (error)
                        return resp.status(401).send({
                            response: `AUthorization failed`,
                        });
                    // set the decode property of the request to provide the status of the token verification
                    req.decode = decode;
                    await sequelize.sync({ force: false });
                    let data = await sequelize.query(`SELECT WardId, WardName FROM ward where WardId = (select WardNo from nurse where StaffNo = ${req.params.id});` , { type: sequelize.QueryTypes.SELECT});
                    let dat = await patientModel.findAll({where:{WardNo:data[0].WardId}});
                    console.log(dat);
                    return resp.status(200).send({ message: dat });
                }
            );
        } else {
            return resp.status(401).send({
                response: `AUthorization failed, no AUTHORIZATION header present in the request`,
            });
        }
    }

}

module.exports = nurse;
