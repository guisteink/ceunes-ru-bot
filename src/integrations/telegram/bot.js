const cronjob = require('node-cron');
const fetch = typeof window !== 'undefined' ? window.fetch : require('node-fetch');
// const fetch = require('whatwg-fetch');

// const telegramApi = require('../../services/telegram.api')

class Bot
{
    constructor()
    {
        this.token = process.env.TELEGRAM_TOKEN;
        this.chat_group_id = process.env.TELEGRAM_GROUP;
        this.baseUrl = `https://api.telegram.org/bot${this.token}/sendMessage`;
    }

    async sendMessage()
    {
        await fetch(this.baseUrl, {
            method: "POST",
            body: JSON.stringify({
                chat_id: this.chat_group_id,
                text: "running a task every minute",
            }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => console.log(res))
            .catch(err => console.error(err))
    }

    deleteAllDayMessages()
    {

    }
}

module.exports = new Bot();