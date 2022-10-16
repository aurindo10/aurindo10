const User = require ('../Models/login')
const bcrypt = require ('bcryptjs')
const jwt = require ('jsonwebtoken')



const user = {
    register: async (req, res, next)=>{
        const data = {
            nome:req.body.nome,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
        }
        const userEmail = await User.findOne({email: req.body.email})
        if (userEmail) {
            return res.status(400).send({msg:'Este email já está cadastrado'})
        }
        else {
        const newUser =  new User(data)
        try {
            await newUser.save()
            res.send({msg:'Usuário cadastrado com sucesso'})
        }
        
        
        catch(error){

        }}
    },
    login: async (req, res, next)=>{
        const userEmail = await User.findOne({email: req.body.email})
        if (!userEmail) return res.status(400).send('Email ou senha incorreto')
        const passwordAndUserMatch = bcrypt.compare(req.body.password, userEmail.password)
        .then((e)=>{
        if (!e) return res.status(400).send({msg:'Email ou senha incorreto'})
        const token = jwt.sign({_id: userEmail._id, admin: userEmail.admin}, process.env.TOKEN_SECRET)
        console.log(process.env.TOKEN_SECRET)
        res.header('authoriztion-token', token)
        res.send({msg:'Usuário logado'})})
    }
 








}

module.exports = user