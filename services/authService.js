const jwt = require("jsonwebtoken");

const CustomError = require('../exceptions/exception');

const User = require('../models/User');
const fieldValidation = require('../utils/fieldValidation');


async function login(req, res) {

    try {
        //Check Emaill and password Undefined
        fieldValidation({ email: req.body.email });
        fieldValidation({ password: req.body.password });

        // Find Account by email anad password
        const user = await User.findOne({ email: req.body.email, password: req.body.password }).exec().catch(err => {
            res.statusCode = 404;
            res.send({ status: "false", message: err.message });
        });

        if (user == null) throw new CustomError("account not found");

        // Send Auth token
        jwt.sign({ email: user.email, admin: user.admin }, process.env.SECRET_KEY, { expiresIn: "1d" }, (err, token) => {

            if (err) res.send({ status: "false", message: err.message });

            if (!err) res.send({ token: token });
        });


    } catch (err) {
        res.statusCode = 405;
        res.send({ status: "false", message: err.message });
    }

}

async function signup(req, res) {
    try {
        //Check Emaill and password Undefined
        fieldValidation({ email: req.body.email });
        fieldValidation({ password: req.body.password });
        fieldValidation({ name: req.body.name });
        fieldValidation({ phone: req.body.phone });

        //Check Emaill Already Registered
        const user = await User.findOne({ email: req.body.email }).exec().catch(err => {
            res.statusCode = 404;
            res.send({ status: "false", message: err.message });
        })

        if (user != null) throw new CustomError("email already registered");

        //Save new user in database
        const newuser = new User(req.body);
        const saveduser = await newuser.save().catch(err => {
            res.statusCode = 404;
            res.send({ status: "false", message: err.message });
        });

        if (saveduser)
            res.send({ status: "true", message: "account registered successfully" });

    }
    catch (err) {
        res.statusCode = 405;
        res.send({ status: "false", message: err.message });
    }
}

module.exports = { login, signup };