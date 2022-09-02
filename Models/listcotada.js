const mongoose = require('mongoose') ;



const productOfList = mongoose.Schema({
    productName: {type: String, required: true, minlength: 3, maxlenght: 100},
    product_id: {type: String, required: true, minlength: 3, maxlenght: 100},
    unidade: {type: String, required: true, minlength: 1, maxlenght: 3},
    valorUnitario: {type: Number, required: true},
    quantidadeMínima: {type: Number, required: true},
    quantidade: {type: String, required: true}})



const priceListSchema  = mongoose.Schema({
        vendedor: {type: String, required: true, minlength: 3, maxlenght: 50},
        cotacao_id: {type: String, required: true, minlength: 3, maxlenght: 100},
        createdAt: {type: Date, default: Date.now},
        listOfProducts: [productOfList]
    })

module.exports = mongoose.model('Listcomparada', listcomparada)