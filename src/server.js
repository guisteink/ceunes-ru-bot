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
        TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN ? process.env.TELEGRAM_TOKEN : 'null',
        TELEGRAM_GROUP_TEST: process.env.TELEGRAM_GROUP_TEST ? process.env.TELEGRAM_GROUP_TEST : 'null',
        PORT: process.env.PORT ? process.env.PORT : 'null',
    });
});

app.listen(port, () =>
{
    console.log(`Server is now running on ${port}!!! 🔥🔥🔥\n`);
    routine.execute()
});