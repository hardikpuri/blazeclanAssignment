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
        // Logic for authenticating user
        let user = req.body;
        // check if the user exist
        let usr = await usersModel.findOne({ where: { username: user.UserName } });
        if (usr === null) {
            return resp.status(404).send({
                message: `User Name ${user.UserName} not found please register`,
            });
        }
        // match the password
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
            expiresIn: 3600 // 1 hour
        });

        return resp.status(200).send({
            message: `User Name ${user.UserName}is Authencated`,
            token: token,
        });
    }

    async authdoctor(req, resp) {
        // Logic for authenticating user
        let user = req.body;
        // check if the user exist
        let usr = await usersModel.findOne({ where: { username: user.UserName } });
        if (usr === null) {
            return resp.status(404).send({
                message: `User Name ${user.UserName} not found please register`,
            });
        }
        // match the password
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
            expiresIn: 3600 // 1 hour
        });
        return resp.status(200).send({
            message: `User Name ${user.UserName}is Authencated`,
            token: token,
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
                    // set the decode property of the request to provide the status of the token verification
                    req.decode = decode;
                    await sequelize.sync({ force: false });
                    let data = await deptModel.findAll();
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
