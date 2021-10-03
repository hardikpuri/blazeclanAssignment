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
const usersModel = require(path.join(__dirname, "./../models/users"))(
    sequelize,
    Sequelize.DataTypes
);

class AuthLogic {

    async authUser(req, resp) {
        let user = req.body;
        let usr = await usersModel.findOne({ where: { username: user.UserName } });
        if (usr === null) {
            return resp.status(404).send({
                message: `User Name ${user.UserName} not found please register`,
            });
        }
        if (usr.password.trim() !== user.Password.trim()) {
            return resp
                .status(401)
                .send({ message: `User Name ${user.UserName}Password does not match` });
        }
        if (usr.role !== 'Admin') {
            return resp
                .status(401)
                .send({ message: `User Name ${user.UserName} is not a admin` });
        }

        const token = jwt.sign({ usr }, jwtSettings.jwtSecret, {
            expiresIn: 3600
        });

        return resp.status(200).send({
            message: `User Name ${user.UserName}is Authencated`,
            token: token,
        });
    }

    async authdoctor(req, resp) {
        let user = req.body;
        let usr = await usersModel.findOne({ where: { username: user.UserName } });
        //console.log(usr.StaffNo);
        if (usr === null) {
            return resp.status(404).send({
                message: `User Name ${user.UserName} not found please register`,
            });
        }
        if (usr.password.trim() !== user.Password.trim()) {
            return resp
                .status(401)
                .send({ message: `User Name ${user.UserName}Password does not match` });
        }
        if (usr.role !== 'Doctor') {
            return resp
                .status(401)
                .send({ message: `User Name ${user.UserName} is not a doctor` });
        }

        const token = jwt.sign({ usr }, jwtSettings.jwtSecret, {
            expiresIn: 3600 
        });
        console.log(usr);
        return resp.status(200).send({
            message: `User Name ${user.UserName}is Authencated`,
            token: token,
            row: usr.StaffNo
        });
    }

    async authNurse(req, resp) {
        let user = req.body;
        let usr = await usersModel.findOne({ where: { username: user.UserName } });
        //console.log(usr.StaffNo);
        if (usr === null) {
            return resp.status(404).send({
                message: `User Name ${user.UserName} not found please register`,
            });
        }
        if (usr.password.trim() !== user.Password.trim()) {
            return resp
                .status(401)
                .send({ message: `User Name ${user.UserName}Password does not match` });
        }
        if (usr.role !== 'Nurse') {
            return resp
                .status(401)
                .send({ message: `User Name ${user.UserName} is not a doctor` });
        }

        const token = jwt.sign({ usr }, jwtSettings.jwtSecret, {
            expiresIn: 3600 
        });
        console.log(usr);
        return resp.status(200).send({
            message: `User Name ${user.UserName}is Authencated`,
            token: token,
            row: usr.StaffNo
        });
    }
    async getData(req, resp) {
        if (req.headers.authorization !== undefined) {
            let receivedToken = req.headers.authorization.split(" ")[1];
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
                    let data = await usersModel.findAll();
                    return resp.status(200).send({ message: data });
                }
            );
        } else {
            return resp.status(401).send({
                response: `AUthorization failed, no AUTHORIZATION header present in the request`,
            });
        }
    }

    async addUser(req, resp) {
        if (req.headers.authorization !== undefined) {
            let receivedToken = req.headers.authorization.split(" ")[1];
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
                    let data = await usersModel.create(req.body);
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

module.exports = AuthLogic;
