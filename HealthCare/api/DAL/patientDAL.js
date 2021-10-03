const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");
const jwt = require("jsonwebtoken");
const { decode } = require("punycode");
const jwtSettings = {
    jwtSecret: "utfsbibombmwwmb0987887890bmwwmbmobibsftu",
};
const sequelize = new Sequelize("hospital", "root", "Blaze@12345", {
    host: "localhost",
    dialect: "mysql",
});
const patientModel = require(path.join(__dirname, "./../models/patient"))(
    sequelize,
    Sequelize.DataTypes
);

class patient {
    
    async getDatabyid(req, resp) {
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
                    let data = await patientModel.findOne({where:{StaffNo:req.params.id}});
                    return resp.status(200).send({ message: data });
                }
            );
        } else {
            return resp.status(401).send({
                response: `AUthorization failed, no AUTHORIZATION header present in the request`,
            });
        }
    }

    async getDatabydid(req, resp) {
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
                    let data = await patientModel.findOne({where:{DoctorId:req.params.id}});
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
                    req.decode = decode;
                    await sequelize.sync({ force: false });
                    let data = await patientModel.findAll();
                    return resp.status(200).send({ message: data });
                }
            );
        } else {
            return resp.status(401).send({
                response: `AUthorization failed, no AUTHORIZATION header present in the request`,
            });
        }
    }

    async update(req, resp) {
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
                    let staff = req.body;
                    let data = await patientModel.update(staff , {where:{StaffNo:staff.StaffNo}});
                    return resp.status(200).send({ message: data });
                }
            );
        } else {
            return resp.status(401).send({
                response: `AUthorization failed, no AUTHORIZATION header present in the request`,
            });
        }
    }

    async addPatient(req, resp) {
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
                    let patient = req.body;
                    let data = await patientModel.create(patient);
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

module.exports = patient;
