const CustomError = require('../exceptions/exception');
function fieldValidation(object) {

    var value = Object.values(object)[0];
    var key = Object.keys(object)[0];

    if (typeof value == "undefined")
        throw new CustomError(key + " is not defined");
    if (value == "")
        throw new CustomError(key + " is empty");

    }   

module.exports = fieldValidation;