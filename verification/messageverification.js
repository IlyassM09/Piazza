// function that will verify if the topics the user is listing for the message are valid 
const topicVerification = (topicArray) => {
    
    const listOfTopic = ['Tech' , 'Politics', 'Health' , 'Sport']

    for(const topic of topicArray){
        if(!listOfTopic.includes(topic)){
            return false
        }
    }

    return true

}

const statusVerification = (expirationDate)=> {

    const date = Date.now()
    const postExpirationDate = new Date(expirationDate)

    if (date > postExpirationDate){
        return 'Expired'
    }else{
        return 'Live'
    }

}

module.exports.topicVerification = topicVerification
module.exports.statusVerification = statusVerification