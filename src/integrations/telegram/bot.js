const _ = require('lodash');
const moment = require('moment');
const cronjob = require('node-cron');

const Telegram = require('@yuva1422/telegram.js');
const client = new Telegram.client();

class Bot
{
    constructor()
    {
        this.token = process.env.TELEGRAM_TOKEN;
    }

    sendMessage()
    {
        console.log('running a task every minute');
    }

    deleteAllDayMessages()
    {

    }
}

module.exports = new Bot();