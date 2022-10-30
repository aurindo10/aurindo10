const mongoose = require('mongoose') ;
const productOfCotacao  = mongoose.Schema({
    name: {type: String, required: true, minlength: 3, maxlenght: 50},
    marca: {type: String, required: true, minlength: 1, maxlenght: 50},
    createdAt: {type: Date, default: Date.now},
    unidade: {type: String, required: true},
    quantidade:{type: Number, required: true},
    produto_id:{type: String, required: true},
})
    

const cotacaoSchema = new mongoose.Schema({
    cotacaoName: {type: String, required: true, minlength: 3, maxlenght: 50},
    products: [productOfCotacao],
    createdAt: {type: Date, default: Date.now}
})



module.exports = mongoose.model('Cotacao', cotacaoSchema)
