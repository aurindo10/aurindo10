const User = require ('../Models/login')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

    const foundUser = await User.findOne({ refreshToken }).exec();

    // Detected refresh token reuse!
    if (!foundUser) {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) return res.sendStatus(403); //Forbidden
                // Delete refresh tokens of hacked user
                const hackedUser = await User.findOne({ email: decoded.email }).exec();
                hackedUser.refreshToken = [];
                const result = await hackedUser.save();
            }
        )
        return res.sendStatus(403); //Forbidden
    }

    const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) {
                // expired refresh token
                foundUser.refreshToken = [...newRefreshTokenArray];
                const result = await foundUser.save();
            }
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403);

            // Refresh token was still valid
            const accessToken = jwt.sign(
                {email: foundUser.email, admin: foundUser.admin},
                process.env.TOKEN_SECRET,
                { expiresIn: '1h' }
            );

            const newRefreshToken = jwt.sign(
                {email: foundUser.email, admin: foundUser.admin},
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '2d' }
            );
            // Saving refreshToken with current user
            foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            const result = await foundUser.save();

            // Creates Secure Cookie with refresh token
            res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

            res.json({ email: foundUser.email, accessToken })
        }
    );
    // const cookies = req.cookies;
    // if (!cookies?.jwt) return res.sendStatus(401);
    // const refreshToken = cookies.jwt;

    // const foundUser =  await User.findOne({refreshToken: refreshToken});

    // if (!foundUser) return res.sendStatus(403); //Forbidden 
    // // evaluate jwt 
    // jwt.verify(
    //     refreshToken,
    //     process.env.REFRESH_TOKEN_SECRET,
    //     (err, decoded) => {
    //         console.log(decoded)
    //         console.log(foundUser.email)
    //         if (err || foundUser.email !== decoded.email) return res.sendStatus(401);


    //         const accessToken = jwt.sign(
    //             {email: foundUser.email, admin: foundUser.admin},
    //             process.env.TOKEN_SECRET,
    //             { expiresIn: '30s' }
    //         );
    //         res.json({ email: foundUser.email , accessToken })
    //     }
    // );
}

module.exports = {handleRefreshToken }