const express = require("express");
const app = express();

app.use((error, req, res, next) =>
{
    res.status(500).json({ message: error.message });
});

app.get("/", (req, res) =>
{
    return res.json({ result: "Bot running!" });
});

module.exports = app;