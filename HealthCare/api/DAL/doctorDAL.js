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
const doctorModel = require(path.join(__dirname, "./../models/doctor"))(
    sequelize,
    Sequelize.DataTypes
);
const appointModel = require(path.join(__dirname, "./../models/appointment"))(
    sequelize,
    Sequelize.DataTypes
);
const patientModel = require(path.join(__dirname, "./../models/patient"))(
    sequelize,
    Sequelize.DataTypes
);

class doctor {
    async addDoctor(req, resp){
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
                    let doctor = req.body;
                    await sequelize.sync({ force: false });
                    let data = await doctorModel.create(doctor);
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
    async appoint(req, resp){
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
                    let appoint = req.body;
                    await sequelize.sync({ force: false });
                    let data = await appointModel.create(appoint);
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
    async getAppointment(req, resp){
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
                    let appoint = req.body;
                    await sequelize.sync({ force: false });
                    let data = await doctorModel.findOne({where:{StaffNo:req.params.id}});
                    let dat = await appointModel.findAll({where:{DoctorId:data.DoctorId}});
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
                    let data = await sequelize.query("SELECT * FROM doctor INNER JOIN staff ON doctor.staffNo = staff.staffNo;" , { type: sequelize.QueryTypes.SELECT});
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

    async getDatabystaff(req, resp) {
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
                    req.decode = decode;
                    await sequelize.sync({ force: false });
                    let data = await doctorModel.findOne({where:{StaffNo:req.params.staffno}});
                    //console.log(data.DoctorId);
                    let dat = await patientModel.findAll({where:{DoctorId:data.DoctorId}});
                    //console.log(dat);
                    return resp.status(200).send({ message: dat });
                }
            );
        } else {
            return resp.status(401).send({
                response: `AUthorization failed, no AUTHORIZATION header present in the request`,
            });
        }
    }

    async doctoronlyinstaff(req, resp) {
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
                    let data = await sequelize.query("SELECT StaffNo,FirstName,LastName FROM staff where Designation = 'Doctor' and StaffNo NOT IN (select StaffNo from doctor);" , { type: sequelize.QueryTypes.SELECT});
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

    async getDoctorName(req, resp) {
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

}

module.exports = doctor;
