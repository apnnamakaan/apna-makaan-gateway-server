const jwt = require("jsonwebtoken");
const CustomError = require("../exceptions/exception");

const SECRET_KEY = "chER";

function authenticate(req, res, next) {

    const bearerHeader = req.headers.authorization;

    if (typeof bearerHeader == "undefined") {
        res.statusCode = 401;
        res.send({
            status: "false",
            message: "authorization header not found",
        });
    }

    if (typeof bearerHeader !== "undefined") {
        const token = bearerHeader.split(" ")[1];
        try {
            jwt.verify(token, SECRET_KEY);
            next();
        } catch (err) {
            res.statusCode = 401;
            res.send({ status: "false", message: err.message });
        }
    }
}

function getTokenData(req, res) {
    const bearerHeader = req.headers.authorization;
    try {

        if (typeof bearerHeader == "undefined") throw new CustomError("authorization header not found");

        const token = bearerHeader.split(" ")[1];
        const data = jwt.verify(token, SECRET_KEY);
        const email = data.email;
        const admin = data.admin;
        res.send({ email, admin });
    }
    catch (err) {
        res.statusCode = 401;
        res.send({ status: "false", message: err.message });
    }
}





module.exports = { authenticate, getTokenData };
