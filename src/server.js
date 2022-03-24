const app = require("./app");
const routine = require("./services/cron-job/routine");
const port = process.env.PORT || 3000;
const cronjob = require('node-cron');

const cycle = '*/3 * * * *' // repeats every 3 minutes
const cycleTest = '* * * * *' // repeats every minutes

app.listen(port, () =>
{
    console.log("Server is now running! 🔥");

    cronjob.schedule(cycleTest, () =>
    {
        console.log('running a task every minute');
    });
});