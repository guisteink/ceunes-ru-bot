const cronjob = require('node-cron');

const botgram = require('../../integrations/telegram/bot');
const scrapper = require('../../integrations/web-scrapper/scrapper')

class Routine
{
    constructor()
    {
        this.botgram = botgram;
        this.scrapper = scrapper;
        this.lunchCycle = '45 13 * * *'; // ?test -> 10:45 AM (fuso horario adaptado - GMT)
        this.dinnerCycle = '45 18 * * *'; // ?test -> 15:45 AM (fuso horario adaptado - GMT)

        this.testCycle = '36 17 * * *'
        this.cronjob = cronjob
    }

    async execute()
    {
        // cronjob.schedule(this.testCycle, async () => await this.botgram.sendTestMessage(process.env.TELEGRAM_GROUP_TEST || -633524025))

        cronjob.schedule(this.lunchCycle, async () =>
        {
            Promise.all([
                await this.botgram.sendMessage("vix", "lunch"),
                await this.botgram.sendMessage("sm", "lunch"),
                await this.botgram.sendMessage("alegre", "lunch")
            ])
        })

        cronjob.schedule(this.dinnerCycle, async () =>
        {
            Promise.all([
                await this.botgram.sendMessage("vix", "dinner"),
                await this.botgram.sendMessage("sm", "dinner"),
                await this.botgram.sendMessage("alegre", "dinner")
            ])
        })

        // await this.botgram.sendMessage("alegre", "lunch")
        // await this.botgram.sendMessage("dinner")
    }
}

module.exports = new Routine();
