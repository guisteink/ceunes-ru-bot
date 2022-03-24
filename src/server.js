const port = process.env.PORT || 3000;

const app = require("./app");
const routine = require("./services/cron-job/routine");
const bot = require('./integrations/telegram/bot');

const cronjob = require('node-cron');

const cycle = '*/3 * * * *' // repeats every 3 minutes
const cycleTest = '* * * * *' // repeats every minutes

app.listen(port, () =>
{
    const botgram = bot;
    console.log("Server is now running! 🔥");

    cronjob.schedule(cycleTest, () =>
    {
        botgram.sendMessage();
    });
});