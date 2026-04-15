// init 
const joi = require('joi')

const userVerification = (Data) => {
    
    const verificationSchema = new joi.object({
        username : joi.string().min(3).max(6),
        email: joi.string().min(6).max(256).email(),
        password : joi.string().min(6).max(1024)
    })

    return verificationSchema.validate(Data)
}

const loginVerification = (Data) => {
    const verificationSchema = new joi.object({
        email: joi.string().min(6).max(256).email(),
        password : joi.string().min(6).max(1024)
    })

    return verificationSchema.validate(Data) 
}



module.exports.userVerification = userVerification
module.exports.loginVerification = loginVerification