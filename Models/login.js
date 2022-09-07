const mongoose = require('mongoose') ;

const userSchema = mongoose.Schema({
    nome: {type: String, required: true, minlength: 3, maxlenght: 50},
    email: {type: String, required: true, minlength: 3, maxlenght: 100},
    password: {type: String, required: true, minlength: 6, maxlenght: 200},
    createdAt: {type: Date, default: Date.now},
    admin: {type: Boolean, default: false}})


module.exports = mongoose.model('User', userSchema);