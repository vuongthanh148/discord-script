require('dotenv').config();
const axios = require('axios')

const handleGetWormholeToken = async () => {
    
}

const recursiveFunc = async () => {
    console.log("Task getWormholeToken is running every 10 minutes " + new Date())
    // await dbConnect()
    await handleGetWormholeToken()
    await new Promise(res => setTimeout(res, 1000*60*10))
    recursiveFunc()
}

module.exports = recursiveFunc()