// init
const jsonwebtoken = require('jsonwebtoken')


function auth(req,res,next) {
    const token = req.header('auth-token')

    if(!token){
        return res.status(401).send({message : 'Access denied. No token provided'})
    }

    try{
        const verified = jsonwebtoken.verify(token,process.env.TOKEN_SECRET)
        req.user = verified
        next()
    }catch(error){
        return res.status(401).send({message : 'Access denied. Token not valid'})
    }
}

module.exports = auth