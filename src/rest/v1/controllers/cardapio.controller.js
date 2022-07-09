const scrapper = require('../../../integrations/web-scrapper/scrapper');
const _ = require('lodash')

// todo: uso da camada do banco fazendo os gets & saves;
class CardapioController{
    constructor(){
        this.scrapper = scrapper;
    }

    async getDayMenu(req, res){
        const { campus, option, when } = req.query ?? {};

        const dayMenu = await this.scrapper.getCardapio(campus, option, when);

        return res.json({ data: dayMenu ?? {} });
    }
}

module.exports = new CardapioController();
