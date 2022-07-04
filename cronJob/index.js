const { default: axios } = require('axios')
import nanoid from 'nanoid';
const Promise = require('bluebird')

const updateRoomNameByTime = async () => {
    let _date = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Jakarta' })
    let arrDate = _date.split('/')
    _date = arrDate[1] + '/' + arrDate[0] + '/' + arrDate[2]
    let _time = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Jakarta' })
    const first = _time.split(' ')[0]
    const second  = _time.split(' ')[1]
    let newTime = ""
    let arr = first.split(':')
    
    newTime = arr[0] + ":" + arr[1] + `${arr[2] % 2 == 0 ? ':' : ":"}` + arr[2] + " " + second
    const time = _date + " " + newTime
    console.log("huntBot", time)
    try{
        const res = await axios.patch('https://discord.com/api/v9/channels/993529966547447838', {
            "name": time,
            "type": 2,
            "topic": "",
            "bitrate": 64000,
            "user_limit": 0,
            "nsfw": false,
            "flags": 0,
            "rate_limit_per_user": 0,
            "rtc_region": null,
            "default_reaction_emoji": null
        }, {
            headers: {
                "Authorization": "OTQ0MzA2OTkwMTgyNzA3MjYw.GtRfjX.Z-zvIzFKZu9X1foE6s8jw1tXhnASuJS7c6szrQ",
                "Content-Type": "application/json"
            }
        })
        console.log(res.data)
    }
    catch(e) {
        console.log(e.response.data);
    }
}

const huntBot = async () => {
    const newID = nanoid(); 
    console.log(newID.toString())
    try{
        const res = await axios.post('https://discord.com/api/v9/channels/934084090397855841/messages', {
            "content": "dh bot",
            "nonce": newID.toString(),
            "tts": false
        }, {
            headers: {
                "Authorization": "OTQ0MzA2OTkwMTgyNzA3MjYw.GtRfjX.Z-zvIzFKZu9X1foE6s8jw1tXhnASuJS7c6szrQ",
                "Content-Type": "application/json"
            }
        })
        // console.log(res.data)
    }
    catch(e) {
        console.log(e.response.data.errors.nonce);
    }
    
}

module.exports = async () => {
    console.log('Jobs started')

    setInterval( huntBot , 14000);
    huntBot();  

    // setInterval( updateRoomNameByTime , 3000);
    // updateRoomNameByTime();  
}
