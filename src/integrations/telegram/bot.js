const fetch = typeof window !== 'undefined' ? window.fetch : require('node-fetch');
const scrapper = require('../../integrations/web-scrapper/scrapper')
const dotenv = require("dotenv")
dotenv.config()
const _ = require('lodash')

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

            const regexAlmoco = /Almoço/ig
            const regexJantar = /Jantar/ig
            const regexPratoPrincipal = /Prato Principal/ig
            const regexSalada = /Salada/ig
            const regexOpcao = /Opção/ig
            const regexAcompanhamento = /Acompanhamento/ig
            const regexGuarnição = /Guarnição/ig

            cardapio = cardapio.replace(regexJantar, "\n---------------------------------------\nJantar")
            cardapio = cardapio.replace(regexPratoPrincipal, "\nPrato Principal")
            cardapio = cardapio.replace(regexSalada, "\nSalada")
            cardapio = cardapio.replace(regexOpcao, "\nOpção")
            cardapio = cardapio.replace(regexAcompanhamento, "\nAcompanhamento")
            cardapio = cardapio.replace(regexGuarnição, "\nGuarnição")

            if (!_.isEmpty(cardapio)) {
                const result = await fetch(this.baseUrl + "/sendMessage", {
                    method: "POST",
                    body: JSON.stringify({ chat_id: this.chat_group_id, text: cardapio, }),
                    headers: { 'Content-Type': 'application/json' }
                })

                if(result.status === 200) console.log('Successfull message')
            }
        } catch (error) {
            console.log(error)
        }
    }

    deleteAllDayMessages()
    {

    }
}

module.exports = new Bot();