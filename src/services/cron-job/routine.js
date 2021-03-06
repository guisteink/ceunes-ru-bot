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
                // await this.botgram.sendMessage("vix", "lunch", process.env.TELEGRAM_GROUP_TEST || -633524025),
                await this.botgram.sendMessage("vix", "lunch", process.env.TELEGRAM_GROUP_TEST || -1001745544259),
                // await this.botgram.sendMessage("sm", "lunch", process.env.TELEGRAM_GROUP_TEST || -633524025),
                await this.botgram.sendMessage("sm", "lunch", process.env.TELEGRAM_GROUP_TEST || -1001745544259),
                // await this.botgram.sendMessage("alegre", "lunch", process.env.TELEGRAM_GROUP_TEST || -633524025)
                await this.botgram.sendMessage("alegre", "lunch", process.env.TELEGRAM_GROUP_TEST || -1001745544259)
            ])
        })

        cronjob.schedule(this.dinnerCycle, async () =>
        {
            Promise.all([
                await this.botgram.sendMessage("vix", "dinner", process.env.TELEGRAM_GROUP_TEST || -1001745544259),
                await this.botgram.sendMessage("sm", "dinner", process.env.TELEGRAM_GROUP_TEST || -1001745544259),
                await this.botgram.sendMessage("alegre", "dinner", process.env.TELEGRAM_GROUP_TEST || -1001745544259)
            ])
        })

        // await this.botgram.sendMessage("alegre", "lunch")
        // await this.botgram.sendMessage("dinner")
    }
}

module.exports = new Routine();