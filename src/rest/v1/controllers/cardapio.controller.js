const scrapper = require('../../../integrations/web-scrapper/scrapper');
const repository  = require('../repository/cardapio.repository');
const _ = require('lodash')

class CardapioController{
    constructor(){
        this.scrapper = scrapper;
        this.repository = repository;
    }

    async getAllDataFromDB(req, res){
        try {
            // todo: add pagination, limit
            const { query } = req.query ?? {};
            const list = await this.repository.getAll(query);
            return res.json({data: list})
        } catch (error) {
            console.log(error)
            return res.json(error)
        }
    }

    //todo
    async getLastDoc(req, res){}

    async getDayMenu(req, res){
        const { campus, option, when } = req.query ?? {};

        const dayMenu = await this.scrapper.getCardapio(campus, option, when);

        return res.json({ data: dayMenu ?? {} });
    }
}

module.exports = new CardapioController();
