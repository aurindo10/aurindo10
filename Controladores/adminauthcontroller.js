const jwt = require ('jsonwebtoken')

module.exports = function (req, res, next){
    const token = req.header('authoriztion-token');
    if(!token) return res.status(401).send("acesso negado")
    try {
        const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
        if (!userVerified.admin){
        console.log(userVerified.admin)
        res.status(401).send("acesso de admin negado")}
        else{
            console.log (userVerified.admin)
        next()}
    }catch(error){
        res.status(401).send("acesso negado")
    }

} 