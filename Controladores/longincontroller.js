const User = require ('../Models/login')



const jwt = {
    register: async (req, res, next)=>{
        const data = {
            nome:req.body.nome,
            email: req.body.email,
            password: req.body.password,
        }
        const userEmail = await User.findOne({email: req.body.email})
        if (userEmail) {
            return res.status(400).send('Este email já está cadastrado')
        }
        else {
        const newUser =  new User(data)
        try {
            await newUser.save()
            res.send('Usuário cadastrado com sucesso')
        }
        
        
        catch(error){

        }}
    }









}

module.exports = jwt