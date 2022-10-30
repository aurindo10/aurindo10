const jwt = require ('jsonwebtoken')

module.exports = function (req, res, next){
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);
   ; // Bearer token
    const token = authHeader.split(' ')[1];
    console.log(token)
    jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.email = decoded.email;
            next();
        }
);
} 

