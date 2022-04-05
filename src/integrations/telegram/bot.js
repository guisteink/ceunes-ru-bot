const dotenv = require("dotenv")
const fetch = typeof window !== 'undefined' ? window.fetch : require('node-fetch');
const _ = require('lodash')

const scrapper = require('../../integrations/web-scrapper/scrapper')
dotenv.config()

class Bot
{
    constructor()
    {
        this.token = process.env.TELEGRAM_TOKEN;
        this.chat_group_id = process.env.TELEGRAM_GROUP;
        this.baseUrl = `https://api.telegram.org/bot${this.token}`;
        this.scrapper = scrapper
    }

    async getUpdates()
    {
        try {
            const result = await fetch(this.baseUrl + "/getUpdates");
            console.log("result", result);
        } catch (error) {
            console.log(error)
        }
    }

    async sendMessage()
    {
        try {
            let cardapio = await this.scrapper.getCardapio()

            const regexAno = /2022/ig
            const regexJantar = /Jantar/ig
            const regexPratoPrincipal = /Prato Principal/ig
            const regexSalada = /Salada/ig
            const regexOpcao = /Opção/ig
            const regexAcompanhamento = /Acompanhamento/ig
            const regexGuarnição = /Guarnição/ig

            cardapio = cardapio.replace(regexAno,"2022 - ")
            cardapio = cardapio.replace(regexJantar, "\n----------------------------------\nJantar")
            cardapio = cardapio.replace(regexPratoPrincipal, "\nPrato Principal")
            cardapio = cardapio.replace(regexSalada, "\nSalada")
            cardapio = cardapio.replace(regexOpcao, "\nOpção")
            cardapio = cardapio.replace(regexAcompanhamento, "\nAcompanhamento")
            cardapio = cardapio.replace(regexGuarnição, "\nGuarnição")

            return await fetch(this.baseUrl + "/sendMessage", {
                method: "POST",
                body: JSON.stringify({ chat_id: this.chat_group_id, text: cardapio, }),
                headers: { 'Content-Type': 'application/json' }
            })

        } catch (error) {
            console.log(error)
        }
    }

    deleteAllDayMessages()
    {

    }
}

module.exports = new Bot();