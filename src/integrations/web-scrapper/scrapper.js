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
        // todo
        // !set all urls VIX-CEUNES-ALEGRE
        this.vixUrl = "https://ru.ufes.br/cardapio/2022-03-25" //? static url
    }

    async getCardapio()
    {
        try {
            const result = await axios(this.vixUrl, { method: 'GET' })
            const $ = cheerio.load(result.data)
            const data = $('.field-content').text()
            return data

        } catch (error) {
            console.log(error)
        }
    }

    

}

module.exports = new Scrapper();