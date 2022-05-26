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
        this.smUrl = "https://restaurante.saomateus.ufes.br/cardapio"
        this.alegreUrl = "https://restaurante.alegre.ufes.br/cardapio"
        this.weekdays = ["Sunday", "Monday", "Tuesday", "Weednesday", "Thursday", "Friday", "Saturday"]
    }

    async getCardapio(restaurant, opt)
    {
        const today = new Date();
        let baseUrl;

        if (restaurant == "vix") baseUrl = this.vixUrl;
        if (restaurant == "sm") baseUrl = this.smUrl;
        if (restaurant == "alegre") baseUrl = this.alegreUrl;

        try {
            if (this.weekdays[today.getDay()] !== ("Sunday" || "Saturday")) {
                console.log("fetching -> " + baseUrl + `/${moment(today).format("YYYY-MM-DD")}` + "...")

                const result = await axios(baseUrl + `/${moment(today).format("YYYY-MM-DD")}`, { method: 'GET' })
                // const result = await axios(baseUrl + `/2022-05-25`, { method: 'GET' }) //? att to dynamic above
                const $ = cheerio.load(result.data, null, false)
                // const data = $('.field-content').text() ! this works too 
                const data = $('.view-content').children("div")
                const lunch = $(data[0]).text()
                const dinner = $(data[1]).text()

                return opt === "lunch" ? lunch : dinner;
            }

            else console.log("Weekend days!")

        } catch (error) {
            console.log(error)
        }
    }



}

module.exports = new Scrapper();