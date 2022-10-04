const express = require ("express");
const app = express();
const produto = require ('./rotas/ListadeCompra')
const morgan =  require ('morgan')
const bodyParser = require ('body-parser');
const path = require ('path')
const cors = require('cors')
const cotacao = require('./rotas/Listofcaotacoes')
const login = require ('./rotas/login')
const admin = require ('./rotas/adminrouter')
require('dotenv').config()
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://aurindo:88190207@cluster0.llc5fu0.mongodb.net/?retryWrites=true&w=majority',(error)=>{ 
    if (error) 
        console.log(error)
    else
        console.log('Mongo Connected')
})


app.use(cors());
app.use(morgan('dev'));
app.use ('/', express.json(), (admin))
app.use ('/user', express.json(), (login))
app.use ('/produto',express.json(), (produto));
app.use ('/cotacoes',express.json(), (cotacao));
app.use ((req, res, next) => {
    const erro = new Error ('não encontrato');
    erro.status = 404;
    next(erro);
})
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if(req.method === 'OPTION') {
        res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE,GET')
    }
    next ();
})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send ({
        erro: {
            mensagem: error.message
        }
    })
})
app.use ((req, res, next) => {
    const erro = new Error ('não encontrato')   ;
    erro.status = 404;
    next(erro);
})
app.set ('views', path.join(__dirname,'templates'))
module.exports = app;
