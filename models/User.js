let mongoose = require('mongoose');
let validator = require('validator');

let userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: {
        type: Number, required: true
    },
    email: {
        type: String, required: true, unique: true, lowercase: true, validate: (value) => {
            return validator.isEmail(value);
        }
    },
    password: { type: String, required: true },
    admin: { type: Boolean,required: false, default:false },
});

module.exports = mongoose.model('User', userSchema)