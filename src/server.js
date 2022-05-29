const port = process.env.PORT || 3000;

const app = require("./app");
const routine = require("./services/cron-job/routine");

app.get("/healthy", (req, res) =>
{
    return res.json("Server is up!");
});

app.listen(port, () =>
{
    console.log(`Server is now running on ${port}!!! 🔥🔥🔥\n`);
    routine.execute()
});