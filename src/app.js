const express = require("express");
const app = express();

const routes = require("./rest/v1/routes/cardapio.routes");

app.use('/cardapio', routes); // inject cardapio rest routes

app.get("/", (req, res) =>
{
    return res.json({ result: "Bot running!" });
});

app.get("/healthy", (req, res) =>
{
    return res.json({ result: "Server is up!" });
});

app.get("/env", (req, res) =>
{
    return res.json({
        TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN || '5147515221:AAF55YP8oKk2v6bOWAIDOb2nUJEKMOmQeys', // TOKEN DO BOT
        TELEGRAM_GROUP_TEST: process.env.TELEGRAM_GROUP_TEST || '-633524025', //esse é o TOKEN DO GRUPO TESTE
        // TELEGRAM_GROUP_TEST: process.env.TELEGRAM_GROUP_TEST || '-1001745544259', // esse é o TOKEN DO GRUPO OFICIAL (N MEXER)
        PORT: process.env.PORT || '8080',
    });
});

module.exports = app;
