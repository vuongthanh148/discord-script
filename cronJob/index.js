const Promise = require('bluebird')

const huntBot = async () => {
    console.log("huntBot", new Date().toLocaleTimeString('en-US', 
    { hour12: false, hour: 'numeric', minute: 'numeric' }).toString())
}

const updateRoomNameByTime = async () => {
    console.log("rename", new Date().toLocaleTimeString('en-US', 
    { hour12: false, hour: 'numeric', minute: 'numeric' }).toString())
}

module.exports = async () => {
    await Promise.delay(1000) // Delay before start
    console.log('Jobs started')

    setInterval( huntBot , 14000);
    huntBot();  

    setInterval( updateRoomNameByTime , 1000);
    updateRoomNameByTime();  
}
