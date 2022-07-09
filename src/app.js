const { application } = require("express");
const express = require("express");
const app = express();
const routes = require("./rest/v1/routes/index");

app.use(routes);

app.use((error, req, res, next) =>
{
    res.status(500).json({ message: error.message });
});

app.get("/", (req, res) =>
{
    return res.json({ result: "Bot running!" });
});

module.exports = app;
