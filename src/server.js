const port = process.env.PORT || 3000;

const app = require("./app");
const routine = require("./services/cron-job/routine");

app.listen(port, () =>
{
    console.log("Server is now running! 🔥");
    routine.execute()

});