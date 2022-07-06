import axios from 'axios'
import { nanoid } from 'nanoid'
import Promise from 'bluebird'

const updateRoomNameByTime = async (channelID, interval) => {
    const maxL = "..............".length
    const lcat = "🧶 ᗢᘏᓗ"
    const rcat = "ᓚᘏᗢ 🧶"
    let direction = 1;
    let curLen = 0;

    while(true){
        // let _date = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Jakarta' })
        // let arrDate = _date.split('/')
        // _date = arrDate[1] + '/' + arrDate[0] + '/' + arrDate[2]
        // let _time = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Jakarta' })
        // const first = _time.split(' ')[0]
        // const second  = _time.split(' ')[1]
        // let newTime = ""
        // let arr = first.split(':')
        
        // newTime = arr[0] + ":" + arr[1] + `${arr[2] % 2 == 0 ? ':' : ":"}` + arr[2] + " " + second
        // const time = _date + " " + newTime
        // console.log("huntBot", time)

        console.log(curLen)
        const curCat = direction === 1 ? rcat : lcat
        let msg = '_'.repeat(curLen) + curCat + '_'.repeat(maxL-curLen)
        console.log(msg)

        try{
            const res = await axios.patch(`https://discord.com/api/v9/channels/${channelID}`, {
                "name": msg,
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
                    "Authorization": "OTQ0MzA2OTkwMTgyNzA3MjYw.Gq6OS9.x5T3xx9eHdvt5852ZZgdAhwT6TocEiEAxXyPGg",
                    "Content-Type": "application/json"
                }
            })
            // console.log(res.data)
        }
        catch(e) {
            console.log(e);
        }
        await Promise.delay(interval)
        direction = curLen === maxL ? -1 : curLen === 0 ? 1 : direction
        curLen += direction;
    }
}

const updateNickname = async (interval) => {
    const maxL = "..............".length
    const lcat = "🧶 ᗢᘏᓗ"
    const rcat = "ᓚᘏᗢ 🧶"
    let direction = 1;
    let curLen = 0;

    while(true){
        // let _date = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Jakarta' })
        // let arrDate = _date.split('/')
        // _date = arrDate[1] + '/' + arrDate[0] + '/' + arrDate[2]
        // let _time = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Jakarta' })
        // const first = _time.split(' ')[0]
        // const second  = _time.split(' ')[1]
        // let newTime = ""
        // let arr = first.split(':')
        
        // newTime = arr[0] + ":" + arr[1] + `${arr[2] % 2 == 0 ? ':' : ":"}` + arr[2] + " " + second
        // const time = _date + " " + newTime
        // console.log("huntBot", time)

        console.log(curLen)
        const curCat = direction === 1 ? rcat : lcat
        let msg = '_'.repeat(curLen) + curCat + '_'.repeat(maxL-curLen)
        console.log(msg)

        try{
            const res = await axios.patch(`https://discord.com/api/v9/guilds/934084089554821121/members/@me`,
                {
                    "nick": msg
                }, {
                headers: {
                    "Authorization": "OTQ0MzA2OTkwMTgyNzA3MjYw.Gq6OS9.x5T3xx9eHdvt5852ZZgdAhwT6TocEiEAxXyPGg",
                    "Content-Type": "application/json"
                }
            })
            // console.log(res.data)
        }
        catch(e) {
            console.log(e);
        }
        await Promise.delay(interval)
        direction = curLen === maxL ? -1 : curLen === 0 ? 1 : direction
        curLen += direction;
    }
}

const huntBot = async (msg, token) => {
    
    while(true) {
        let message = msg
        const newID = nanoid(); 
        let _interval = Math.floor(Math.random() * 1) + 15;
        if(message == 'hunt') {
            let face = Math.floor(Math.random() * 2);
            let type = Math.floor(Math.random() * 4);
            let amount = Math.floor(Math.random() * 100);
            
            switch(type) {
                case 1:
                    message = face == 1 ? `dcf ${amount} h bot` : `dcf ${amount} t bot`
                    // message = 'dh bot 4'
                    break;
                case 2:
                    message = 'dh bot 1'
                break;
                case 3:
                    message = 'dcf 50 h'
                break;
                case 4:
                    message = 'dh bot 3'
                break;
                case 0:
                    message = 'db'
                break;
                // case 0:
                //     message = 'dinv bot'
                // break;
                default:
                // code block
            }
        }
        else _interval = 5*60 + 10
        console.log(new Date())
        console.log(newID.toString(), message)
        try{
            token.forEach(t => {
                axios.post('https://discord.com/api/v9/channels/934084090397855841/messages', {
                    "content": message,
                    "nonce": newID.toString(),
                    "tts": false
                }, {
                    headers: {
                        "Authorization": t,
                        "Content-Type": "application/json"
                    }
                })
            })
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
                "Authorization": "OTQ0MzA2OTkwMTgyNzA3MjYw.Gq6OS9.x5T3xx9eHdvt5852ZZgdAhwT6TocEiEAxXyPGg",
                "Content-Type": "application/json"
            }
        })
        // console.log(res.data[res.data.length - 1] )
        const curChannel = res.data.find(c => c.name == 'ngay mai se het buon...ngu' || c.name.includes('AM') || c.name.includes('PM') || c.name.includes('___'))
        // console.log(curChannel)
        return curChannel?.id
    }
    catch(e) {
        console.log(e);
    }
}

export default async function startJobs() {
    console.log('Jobs started')

    huntBot('hunt', ["OTQ0MzA2OTkwMTgyNzA3MjYw.Gq6OS9.x5T3xx9eHdvt5852ZZgdAhwT6TocEiEAxXyPGg"]);
    await Promise.delay(5000)
    huntBot('dpray', ["OTQ0MzA2OTkwMTgyNzA3MjYw.Gq6OS9.x5T3xx9eHdvt5852ZZgdAhwT6TocEiEAxXyPGg"]);

    updateNickname(1200)

    let cID
    while(!cID) {
        cID = await findChannelId()
        if(cID) console.log("found cID", cID);
        else console.log("not found cID");
        await Promise.delay(30000)
    }
    if(cID)
        updateRoomNameByTime(cID, 1200)
    else console.log("cID not found");
}
