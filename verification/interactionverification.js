const expirationVerification = (expirationTime) => {

    const time = Date.now()
    const postExpiration = new Date(expirationTime)
    
    if (time > postExpiration){
        return true
    }

    return false
}

const messageExpirationCountDown = (expirationTime) => {
    const time = Date.now()/1000
    const postExpiration = new Date(expirationTime)/1000

    const countdown = postExpiration - time

    if (countdown < 0){
        return 0
    }

    return Math.floor(countdown)
}



module.exports.expirationVerification = expirationVerification
module.exports.messageExpirationCountDown = messageExpirationCountDown