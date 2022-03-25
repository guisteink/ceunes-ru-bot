const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");

class Scrapper
{
    constructor()
    {
        this.axios = axios
        this.cheerio = cheerio
        this.pretty = pretty
        this.vixUrl = "https://ru.ufes.br/cardapio"
    }

    async getCardapioVix()
    {
        try {
            const result = await axios(this.vixUrl, {method: 'GET'})
            const $ = cheerio.load(result.data)
            const data = $('#view-content').children("div").children("div").children("span")
            console.log(data.text())


        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = new Scrapper();