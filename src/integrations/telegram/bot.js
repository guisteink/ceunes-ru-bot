const dotenv = require("dotenv")
const fetch = typeof window !== 'undefined' ? window.fetch : require('node-fetch');
const _ = require('lodash')

const scrapper = require('../../integrations/web-scrapper/scrapper')
dotenv.config()

class Bot
{
    constructor()
    {
        this.token = process.env.TELEGRAM_TOKEN || '5147515221:AAF55YP8oKk2v6bOWAIDOb2nUJEKMOmQeys';
        this.baseUrl = `https://api.telegram.org/bot${this.token}`;
        this.scrapper = scrapper
        this.campusGroupToken = process.env.TELEGRAM_GROUP_TEST || -633524025 // !GRUPO DE TESTES
        // this.campusGroupToken = process.env.TELEGRAM_GROUP_TEST || -1001745544259 // !GRUPO OFICIAL
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

    async sendTestMessage(campusGroup)
    {
        return await fetch(this.baseUrl + "/sendMessage", {
            method: "POST",
            body: JSON.stringify({ chat_id: campusGroup, text: "Manutenção programada", }),
            headers: { 'Content-Type': 'application/json' }
        })
    }

    /**
     *
     * @param {*} campus "sm, vix ou alegre"
     * @param {*} opt "almoco ou janta"
     * @returns
     */
    async sendMessage(campus, opt)
    {
        let isValidMessage;
        const regexPratoPrincipal = /Prato Principal/ig
        const regexSalada = /Salada/ig
        const regexSaladas = /Saladas/ig
        const regexOpcao = /Opção/ig
        const regexAcompanhamento = /Acompanhamento/ig
        const regexGuarnição = /Guarnição/ig
        const regexEntrada = /Entrada/ig
        const regexAcompanhamento1 = /Acompanhamento 1/ig
        const regexAcompanhamento2 = /Acompanhamento 2/ig
        const regexSobremesa = /Sobremesa/ig
        const regexGoiabeirasEMaruipe = /Goiabeiras e Maruípe/ig
        const regexVixAlmoco = /Almoço/ig //check if isValid message before send
        const regexSMAlmoco = /ALMOÇO/ig
        const regexSMjantar = /Jantar/ig

        try {
            switch (opt) {
                case "lunch":
                    let lunch = await this.scrapper.getCardapio(campus, "lunch")

                    if (campus === "vix") {
                        lunch = lunch.replace(regexGoiabeirasEMaruipe, "")
                        lunch = lunch.replace(regexVixAlmoco, "Almoço (Goiabeiras e Maruípe)")
                        lunch = lunch.replace(regexPratoPrincipal, "\n[Prato Principal]")
                        lunch = lunch.replace(regexSalada, "[Salada]")
                        lunch = lunch.replace(regexOpcao, "\n[Opção]")
                        lunch = lunch.replace(regexAcompanhamento, "\n[Acompanhamento]")
                        lunch = lunch.replace(regexGuarnição, "\n[Guarnição]")
                        lunch = lunch.replace(regexSobremesa, "\n[Sobremesa]")
                        lunch = lunch.replace("*", "\n*")
                    }

                    if (campus === "sm") {
                        lunch = lunch.replace(regexSMAlmoco, "Almoço (São mateus)")
                        lunch = lunch.replace(regexAcompanhamento1, "\n[Acompanhamento 1]")
                        lunch = lunch.replace(regexAcompanhamento2, "\n[Acompanhamento 2]")
                        lunch = lunch.replace(regexPratoPrincipal, "\n[Prato Principal]")
                        lunch = lunch.replace(regexGuarnição, "\n[Guarnição]")
                        lunch = lunch.replace(regexSaladas, "\n[Saladas]")
                        lunch = lunch.replace(regexSobremesa, "\n[Sobremesa]")
                    }

                    if (campus === "alegre") {
                        lunch = lunch.replace(regexEntrada, "\n[Entrada]")
                        lunch = lunch.replace(regexOpcao, "\n[Opção]")
                        lunch = lunch.replace(regexAcompanhamento, "\n[Acompanhamento]")
                        lunch = lunch.replace(regexGuarnição, "\n[Guarnição]")
                        lunch = lunch.replace(regexSobremesa, "\n[Sobremesa]")
                        lunch = lunch.replace("*", "\n*")
                    }

                    isValidMessage = lunch.match("Almoço" || "ALMOÇO" || "ALMOCO" || "Almoco")

                    return isValidMessage != null ?
                        await fetch(this.baseUrl + "/sendMessage", {
                            method: "POST",
                            body: JSON.stringify({ chat_id: campusGroup, text: lunch, }),
                            // body: JSON.stringify({ chat_id: this.chat_group_id, text: "Manutenção programada", }),
                            headers: { 'Content-Type': 'application/json' }
                        })
                        :
                        null;

                // return await fetch(this.baseUrl + "/sendMessage", {
                //     method: "POST",
                //     body: JSON.stringify({ chat_id: campusGroup, text: lunch, }),
                //     // body: JSON.stringify({ chat_id: this.chat_group_id, text: "Manutenção programada", }),
                //     headers: { 'Content-Type': 'application/json' }
                // })

                case "dinner":
                    let dinner = await this.scrapper.getCardapio(campus, "dinner")

                    if (campus === "vix") {
                        dinner = dinner.replace(/Goiabeiras/ig, "")
                        dinner = dinner.replace(/Jantar/ig, "Jantar (Goiabeiras e Maruípe)")
                        dinner = dinner.replace(regexPratoPrincipal, "\n[Prato Principal]")
                        dinner = dinner.replace(regexSalada, "[Salada]")
                        dinner = dinner.replace(regexOpcao, "\n[Opção]")
                        dinner = dinner.replace(regexAcompanhamento, "\n[Acompanhamento]")
                        dinner = dinner.replace(regexGuarnição, "\n[Guarnição]")
                        dinner = dinner.replace(regexSobremesa, "\n[Sobremesa]")
                        dinner = dinner.replace("*", "\n*")
                    }

                    if (campus === "sm") {
                        dinner = dinner.replace(regexSMjantar, "Jantar (São mateus)")
                        dinner = dinner.replace(regexAcompanhamento1, "\n[Acompanhamento 1]")
                        dinner = dinner.replace(regexAcompanhamento2, "\n[Acompanhamento 2]")
                        dinner = dinner.replace(regexPratoPrincipal, "\n[Prato Principal]")
                        dinner = dinner.replace(regexGuarnição, "\n[Guarnição]")
                        dinner = dinner.replace(regexSaladas, "\n[Saladas]")
                        dinner = dinner.replace(regexSobremesa, "\n[Sobremesa]")
                    }

                    if (campus === "alegre") {
                        dinner = dinner.replace(/Almoço/ig, "Jantar")
                        dinner = dinner.replace(regexEntrada, "\n[Entrada]")
                        dinner = dinner.replace(regexOpcao, "\n[Opção]")
                        dinner = dinner.replace(regexAcompanhamento, "\n[Acompanhamento]")
                        dinner = dinner.replace(regexGuarnição, "\n[Guarnição]")
                        dinner = dinner.replace(regexSobremesa, "\n[Sobremesa]")
                        dinner = dinner.replace("*", "\n*")
                    }

                    isValidMessage = dinner.match("Jantar" || "JANTAR")

                    return isValidMessage != null ?
                        await fetch(this.baseUrl + "/sendMessage", {
                            method: "POST",
                            body: JSON.stringify({ chat_id: this.campusGroup, text: dinner, }),
                            // body: JSON.stringify({ chat_id: this.chat_group_id, text: "Manutenção programada", }),
                            headers: { 'Content-Type': 'application/json' }
                        })
                        :
                        null;
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
