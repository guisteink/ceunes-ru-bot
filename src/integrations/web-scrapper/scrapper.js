const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");
const moment = require("moment");

class Scrapper
{
    constructor()
    {
        this.axios = axios
        this.cheerio = cheerio
        this.pretty = pretty
        this.vixUrl = "https://ru.ufes.br/cardapio" 
        this.weekdays = ["Sunday", "Monday", "Tuesday", "Weednesday", "Thursday", "Friday", "Saturday"]
    }

    async getCardapio()
    {
        try {
            const today = new Date();
            if (!this.weekdays[today.getDay()] === ("Sunday" || "Saturday")) {
                console.log("fetching -> " + this.vixUrl + `/${moment(today).format("YYYY-MM-DD")}`+"...")

                const result = await axios(this.vixUrl + `/${moment(today).format("YYYY-MM-DD")}`, { method: 'GET' })
                const $ = cheerio.load(result.data)
                const data = $('.field-content').text()
                return data
            }
            console.log("Weekend days!")
        } catch (error) {
            console.log(error)
        }
    }



}

module.exports = new Scrapper();