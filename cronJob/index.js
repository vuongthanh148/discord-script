import axios from 'axios'
import { nanoid } from 'nanoid'
import Promise from 'bluebird'

const updateRoomNameByTime = async (channelID, interval) => {
    while(true){
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
            const res = await axios.patch(`https://discord.com/api/v9/channels/${channelID}`, {
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
            // console.log(res.data)
        }
        catch(e) {
            console.log(e.response.data);
        }
        await Promise.delay(interval)
    }
}

const huntBot = async (msg) => {
    
    while(true) {
        let message = msg
        const newID = nanoid(); 
        let _interval = Math.floor(Math.random() * 7) + 5;
        if(message == 'hunt') {
            let face = Math.floor(Math.random() * 2);
            let type = Math.floor(Math.random() * 4);
            let amount = Math.floor(Math.random() * 50);
            
            switch(type) {
                case 1:
                    message = face == 1 ? `dcf ${amount} h bot` : `dcf ${amount} t bot`
                    break;
                case 2:
                    message = 'dh bot'
                break;
                case 3:
                    message = 'dh bot 2'
                break;
                case 4:
                    message = 'dlb all bot'
                break;
                case 0:
                    message = 'dinv bot'
                break;
                default:
                // code block
            }
        }
        
        console.log(new Date())
        console.log(newID.toString(), message)
        try{
            const res = await axios.post('https://discord.com/api/v9/channels/934084090397855841/messages', {
                "content": message,
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
        await Promise.delay(_interval * 1000)
    }
}

const findChannelId = async () => {
    try{
        const res = await axios.get('https://discord.com/api/v9/guilds/934084089554821121/channels', {
            headers: {
                "Authorization": "OTQ0MzA2OTkwMTgyNzA3MjYw.GtRfjX.Z-zvIzFKZu9X1foE6s8jw1tXhnASuJS7c6szrQ",
                "Content-Type": "application/json"
            }
        })
        // console.log(res.data[res.data.length - 1] )
        const curChannel = res.data.find(c => c.name == 'ngay mai se het buon...ngu' || c.name.includes('AM') || c.name.includes('PM'))
        // console.log(curChannel)
        return curChannel?.id
    }
    catch(e) {
        console.log(e);
    }
}

export default async function startJobs() {
    console.log('Jobs started')

    huntBot('hunt');
    await Promise.delay(5000)
    // huntBot('owo');

    let cID
    while(!cID) {
        cID = await findChannelId()
        if(cID) console.log("found cID", cID);
        else console.log("not found cID");
        await Promise.delay(5000)
    }
    if(cID)
        updateRoomNameByTime(cID, 3000)
    else console.log("cID not found");
}
