const cronjob = require('node-cron');

const botgram = require('../../integrations/telegram/bot');
const scrapper = require('../../integrations/web-scrapper/scrapper')

class Routine
{
    constructor()
    {
        this.botgram = botgram;
        this.scrapper = scrapper;
        // this.cycle = "0 0 10 * * *"; // every day at 10:00 AM -> testing
        this.cycle = '* * * *'; //every hour test
        this.cronjob = cronjob
    }

    async execute()
    {
        cronjob.schedule(this.cycle, async () => await this.botgram.sendMessage());
    }
}

module.exports = new Routine();