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
        return await fetch(this.baseUrl, {
            method: "POST",
            body: JSON.stringify({ chat_id: this.chat_group_id, text: "[HERE GOES THE SCRAPPER CONTENT] -> running a task every minute", }),
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