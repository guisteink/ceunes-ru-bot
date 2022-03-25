const cronjob = require('node-cron');
const fetch = typeof window !== 'undefined' ? window.fetch : require('node-fetch');
const scrapper = require('../../integrations/web-scrapper/scrapper')
const dotenv = require("dotenv")
dotenv.config()

class Bot
{
    constructor()
    {
        this.token = process.env.TELEGRAM_TOKEN;
        this.chat_group_id = process.env.TELEGRAM_GROUP;
        this.baseUrl = `https://api.telegram.org/bot${this.token}`;
        this.scrapper = scrapper
    }



    async getUpdates()
    {
        try {
            const result = await fetch(this.baseUrl + "/getUpdates");
            console.log("result", result);
        } catch (error) {
            console.log(error)
        }
    }

    async sendMessage()
    {
        console.log('running a task every minute');
        try {
            await this.scrapper.getCardapioVix()
            // const result = await fetch(this.baseUrl + "/sendMessage", {
            //     method: "POST",
            //     body: JSON.stringify({
            //         chat_id: this.chat_group_id,
            //         text: "running a task every minute",
            //     }),
            //     headers: { 'Content-Type': 'application/json' }
            // })

            // console.log("result", result)

            // .then(res => console.log(res))
            // await this.api.sendMessage({
            //     chat_id: "1739406755",
            //     text: "text test text test text testtext test",
            // })
        } catch (error) {
            console.log(error)
        }
    }

    deleteAllDayMessages()
    {

    }
}

module.exports = new Bot();