const mongoose = require('mongoose') ;
const vendedor  = mongoose.Schema({
    nome: {type: String, required: true, minlength: 3, maxlenght: 50},
    empresa: {type: String, required: true, minlength: 3, maxlenght: 100},
    createdAt: {type: Date, default: Date.now},
})

module.exports = mongoose.model('Vendedor', vendedor)