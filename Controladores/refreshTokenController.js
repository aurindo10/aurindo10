const User = require ('../Models/login')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser =  await User.findOne({refreshToken: refreshToken});

    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            console.log(decoded)
            console.log(foundUser.email)
            if (err || foundUser.email !== decoded.email) return res.sendStatus(401);


            const accessToken = jwt.sign(
                {email: foundUser.email, admin: foundUser.admin},
                process.env.TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            res.json({ accessToken })
        }
    );
}

module.exports = {handleRefreshToken }