const port = process.env.PORT || 3000;

const app = require("./app");
const routine = require("./services/cron-job/routine");

app.get("/healthy", (req, res) =>
{
    return res.json({ result: "Server is up!" });
});

app.get("/env", (req, res) =>
{
    return res.json({
        TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN || '5147515221:AAF55YP8oKk2v6bOWAIDOb2nUJEKMOmQeys',
        TELEGRAM_GROUP_TEST: process.env.TELEGRAM_GROUP_TEST || '-633524025',
        PORT: process.env.PORT || '8080',
    });
});

app.listen(port, () =>
{
    console.log(`Server is now running on ${port}!!! 🔥🔥🔥\n`);
    routine.execute()
});