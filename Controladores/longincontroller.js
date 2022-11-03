
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

    const cookies = req.cookies;

    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await User.findOne({ email: email }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        // const roles = Object.values(foundUser.roles).filter(Boolean);
        // create JWTs
        const accessToken = jwt.sign(
            {
                email: foundUser.email, admin: foundUser.admin
            },
            process.env.TOKEN_SECRET,
            { expiresIn: '1h' }
        );
        const newRefreshToken = jwt.sign(
            {email: foundUser.email, admin: foundUser.admin},
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '2d' }
        );

        // Changed to let keyword
        let newRefreshTokenArray =
            !cookies?.jwt
                ? foundUser.refreshToken
                : foundUser.refreshToken.filter(rt => rt !== cookies.jwt);

        if (cookies?.jwt) {

            /* 
            Scenario added here: 
                1) User logs in but never uses RT and does not logout 
                2) RT is stolen
                3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
            */
            const refreshToken = cookies.jwt;
            const foundToken = await User.findOne({ refreshToken }).exec();

            // Detected refresh token reuse!
            if (!foundToken) {
                // clear out ALL previous refresh tokens
                newRefreshTokenArray = [];
            }

            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        }

        // Saving refreshToken with current user
        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        const result = await foundUser.save();

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.json({ accessToken });

    } else {
        res.sendStatus(401);
    }
    },
    loggout: async (req, res, next)=>{

        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(204); //No content
        const refreshToken = cookies.jwt;
        // Is refreshToken in db?
        const foundUser = await User.findOne({ refreshToken }).exec();
        if (!foundUser) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            return res.sendStatus(204);
        }
    
        // Delete refreshToken in db
        foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);;
        const result = await foundUser.save();
        console.log(result);
    
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        res.sendStatus(204);

    }
}

module.exports = user

