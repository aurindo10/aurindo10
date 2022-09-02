const mongoose = require('mongoose') ;
const produtoSchema  = mongoose.Schema({
    nome: {type: String, required: true, minlength: 3, maxlenght: 50},
    marca: {type: String, required: true, minlength: 3, maxlenght: 100},
    PriceHistory: {type: Array, required: true},
    createdAt: {type: Date, default: Date.now},
    unidade: {type: String, required: true}
})


module.exports = mongoose.model('Produto', produtoSchema)