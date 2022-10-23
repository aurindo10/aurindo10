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
        .then(async (e)=>{
            if (!e) return res.status(400).send({msg:'Email ou senha incorreto'})
            const accessToken = jwt.sign(
                {email: userEmail.email, admin: userEmail.admin},
                process.env.TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            const refreshToken = jwt.sign(
                {email: userEmail.email, admin: userEmail.admin},
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            User.findOneAndUpdate({email: req.body.email}, {refreshToken:refreshToken}, (err, doc)=>{console.log(err)})
            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
            res.json({ accessToken })
            console.log(accessToken);
        }
    )
    }
}

module.exports = user