const cronjob = require('node-cron');

const botgram = require('../../integrations/telegram/bot');
const scrapper = require('../../integrations/web-scrapper/scrapper')

class Routine
{
    constructor()
    {
        this.botgram = botgram;
        this.scrapper = scrapper;
        // this.cycle = '45 13 * * *'; // -> 10:20 AM
        this.cycle = "* * * * *"; // all minute
        this.cronjob = cronjob
    }

    async execute()
    {
        // cronjob.schedule(this.cycle, async () => await this.botgram.sendMessage());
        await this.botgram.sendMessage()
    }
}

module.exports = new Routine();