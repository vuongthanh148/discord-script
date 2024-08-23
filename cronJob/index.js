import axios from 'axios';
import Promise from 'bluebird';
import { ChatGPTAPI } from 'chatgpt';
import fs from 'fs';
import { nanoid } from 'nanoid';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const kjv = "Mzk5OTU4MTI3MzIxMTUzNTQ2.GVSdos.XnB8spNy9YLk9XGfGXD6EFjudnQyJM9PqMT528"
const sdn = "OTQ0MzA2OTkwMTgyNzA3MjYw.Gq6OS9.x5T3xx9eHdvt5852ZZgdAhwT6TocEiEAxXyPGg"
const kjvId = "399958127321153546"
const nekoId = "1248205177589334026"

const kuri = "NzI1NzE5ODA0MjUzNTY5MDM1.GCP9GF.E7BLNX_K-kA7yy_UfM48drKI1_18RF3_HQ2ATA"
const kuriId = "725719804253569035"

const channelNight = '1255049489199272039'
const channelVNU = '1274394861457506445'


const userKey = kuri
const userId = kuriId
const api = new ChatGPTAPI({
    apiKey: "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"
})

const updateRoomNameByTime = async (channelID, interval) => {
    const maxL = "..............".length
    const lcat = "🧶 ᗢᘏᓗ"
    const rcat = "ᓚᘏᗢ 🧶"
    let direction = 1;
    let curLen = 0;

    while (true) {
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
        let msg = '_'.repeat(curLen) + curCat + '_'.repeat(maxL - curLen)
        console.log(msg)

        try {
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
                    "Authorization": kjv,
                    "Content-Type": "application/json"
                }
            })
            // console.log(res.data)
        }
        catch (e) {
            console.log({ e });
        }
        await Promise.delay(interval)
        direction = curLen === maxL ? -1 : curLen === 0 ? 1 : direction
        curLen += direction;
    }
}

const updateNickname = async (interval) => {
    const maxL = "..............".length
    // const lcat = "🧶 ᗢᘏᓗ"
    // const rcat = "ᓚᘏᗢ 🧶"
    const lcat = "vente"
    const rcat = "vente"
    let direction = 1;
    let curLen = 0;

    while (true) {
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
        let msg = '_'.repeat(curLen) + curCat + '_'.repeat(maxL - curLen)
        console.log(msg)

        try {
            const res = await axios.patch(`https://discord.com/api/v9/guilds/934084089554821121/members/@me`,
                {
                    "nick": msg
                }, {
                headers: {
                    "Authorization": "Mzk5OTU4MTI3MzIxMTUzNTQ2.GrmlDZ.TMRq19ecE5NbN2KXNP3ZxZ3oPSAR4r15s3fk4A",
                    "Content-Type": "application/json"
                }
            })
            // console.log(res.data)
        }
        catch (e) {
            console.log(e.response.data);
        }
        await Promise.delay(interval)
        direction = curLen === maxL ? -1 : curLen === 0 ? 1 : direction
        curLen += direction;
    }
}

const huntBot = async (msg, token) => {

    while (true) {
        let message = msg
        const newID = nanoid();
        let _interval = Math.floor(Math.random() * 1) + 15;
        if (message == 'hunt') {
            let face = Math.floor(Math.random() * 2);
            let type = Math.floor(Math.random() * 4);
            let amount = Math.floor(Math.random() * 100);

            switch (type) {
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
        else _interval = 5 * 60 + 10
        console.log(new Date())
        console.log(newID.toString(), message)
        try {
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
        catch (e) {
            console.log(e.response.data.errors.nonce);
        }
        await Promise.delay(_interval * 1000)
    }
}

const findChannelId = async () => {
    try {
        const res = await axios.get('https://discord.com/api/v9/guilds/934084089554821121/channels', {
            headers: {
                "Authorization": kjv,
                "Content-Type": "application/json"
            }
        })
        const curChannel = res.data.find(c => c.permission_overwrites.find(p => p.id == "399958127321153546" && p.allow == "1049616"))
        // console.log(curChannel)
        return curChannel?.id
    }
    catch (e) {
        console.log(e);
        // console.log(e.response.data);
    }
}

const updateNameByLyrics = async (channelID, interval) => {
    let curLyrics = ""
    checkForLyrics(curLyric)
    while (true) {
        await sendRequestUpdateRoomName(msg, channelID)
        await Promise.delay(interval)
        direction = curLen === maxL ? -1 : curLen === 0 ? 1 : direction
        curLen += direction;
    }
}

const sendRequestUpdateRoomName = async (msg, channelID) => {
    try {
        const res = await axios.patch(`https://discord.com/api/v9/channels/${channelID}`, {
            "name": msg,
            "type": 2,
            "topic": "",
            "bitrate": 64000,
            // "user_limit": 0,
            "nsfw": false,
            "flags": 0,
            "rate_limit_per_user": 0,
            "rtc_region": null,
            "default_reaction_emoji": null
        }, {
            headers: {
                "Authorization": kjv,
                "Content-Type": "application/json"
            }
        })
        // console.log(res.data)
    }
    catch (e) {
        console.log(e.response.data);
    }
}

const getChannelMessages = async (channelID, limit) => {
    try {
        const res = await axios.get(`https://discord.com/api/v9/channels/${channelID}/messages?limit=${limit}`, {
            headers: {
                "Authorization": userKey,
                "Content-Type": "application/json"
            }
        })

        console.log({ data: res.data[0] })
        // console.log({ data: res.data[0].reactions[0] })

        let latestAcceptedWord = ""
        for (const msg of res.data) {
            const author = msg.author.id
            if (msg.reactions && msg.reactions[0].emoji.name == "checked") return [author, msg.content.split(' ')[1]]
            else if (msg.content.includes('**') && msg.content.includes('Từ bắt đầu')) {
                let str = msg.content
                let match = str.match(/\*\*(.*?)\*\*/);
                let word = match ? match[1] : ''; // 'di mọi'
                console.log({ word })
                return [author, word.split(' ')[1]]
            }

        }
        // console.log("latestQuestion: ", latestQuestion);
        return [latestAcceptedWord]
    }
    catch (e) {
        console.log(e);
    }
}

const sendMessageToChannel = async (channelID, referMessageId, content) => {
    try {
        const res = await axios.post(`https://discord.com/api/v9/channels/${channelID}/messages`, {
            "content": content,
            "nonce": Date.now(),
            "tts": false,
            // "message_reference": {
            //     "message_id": referMessageId
            // }
        }, {
            headers: {
                "Authorization": userKey,
                "Content-Type": "application/json"
            }
        })
        // console.log(res.data)
    }
    catch (e) {
        console.log(e.response.data);
    }
}

const chatGPT = async (channelID, interval) => {
    let curQuestion = ''
    while (true) {
        const latestQuestion = await getChannelMessages(channelID, 5)
        console.log(new Date().toString(), " - latestQuestion: ", latestQuestion);

        if (latestQuestion && latestQuestion.content.replace("_ask ", "") != curQuestion) {
            curQuestion = latestQuestion.content.replace("_ask ", "")
            //call chatgpt API 
            const res = await api.sendMessage(curQuestion)
            console.log(res.text)
            //send message back to discord
            await sendMessageToChannel(channelID, latestQuestion.id, res.text)
            await Promise.delay(interval)
        }
    }
}

const readFile = promisify(fs.readFile);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const findWordFromFile = async (word, fileName) => {
    const filePath = path.join(__dirname, fileName);
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const results = [];

    const endWord = []

    for await (const line of rl) {
        const obj = JSON.parse(line);
        const words = obj.text.split(' ');
        const index = words.indexOf(word);
        if (index !== -1 && index < words.length - 1) {
            const newWord = `${word} ${words[index + 1]}`
            if (newWord.indexOf('-') > -1) continue
            const res = await checkWord(filePath, words[index + 1] + " ")
            if (res)
                endWord.push(newWord);
            results.push(newWord)
        }
    }

    console.log("endWord length", endWord.length)
    if (endWord.length > 0) return endWord
    return results;
}


const checkWord = async (filePath, word) => {
    try {
        // console.log({ word })
        const data = await readFile(filePath, 'utf8');
        // const words = data.split(/\s+/); // split by whitespace
        return data.indexOf(word) == -1;
    } catch (err) {
        console.error(err);
        return false;
    }
};


const playGame = async (channelID, limit, interval, isAnswer) => {
    while (true) {
        const [author, latestMessage] = await getChannelMessages(channelID, limit)
        console.log(new Date().toString(), " - latestMessage: ", latestMessage);
        console.log({ author, userId })
        const arr = await findWordFromFile(latestMessage, "words.txt")
        console.log(arr)
        const randomElement = arr[Math.floor(Math.random() * arr.length)];

        if (author != userId && isAnswer && arr.length > 0) { await sendMessageToChannel(channelID, "", randomElement) }
        await Promise.delay(Math.floor(Math.random() * 5 + 5) * 1000)
    }
}

export default async function startJobs() {
    console.log('Jobs started')

    // let cID = channelVNU
    let cID = channelNight
    while (!cID) {
        cID = await findChannelId()
        if (cID) {
            console.log("found cID", cID);
            break
        }
        else console.log("not found cID");
        // await Promise.delay(30000)
    }
    if (cID) {
        // playGame(channelNight, 50, 3000, true)
        playGame(channelVNU, 50, 2500, false)
    }
    else console.log("cID not found");
}
