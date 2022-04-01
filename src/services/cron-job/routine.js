const cronjob = require('node-cron');

const botgram = require('../../integrations/telegram/bot');
const scrapper = require('../../integrations/web-scrapper/scrapper')

class Routine
{
    constructor()
    {
        this.botgram = botgram;
        this.scrapper = scrapper;
        this.cycle = '20 13 * * *'; 
        // this.cycle = "* * * * *"; // 13:28
        this.cronjob = cronjob
    }

    async execute()
    {
        cronjob.schedule(this.cycle, async () => await this.botgram.sendMessage());
        // this.botgram.sendMessage()
    }
}

module.exports = new Routine();