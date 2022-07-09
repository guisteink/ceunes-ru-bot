const cardapioModel = require('../models/cardapio.model');

class CardapioRepository {
    constructor(){
        this.model = cardapioModel;
    }

    static async save(data){
        const newDoc = await this.model.create(data);
        return newDoc;
    }

    static async delete(id){
        const deletedDoc = await this.model.findByIdAndDelete({ _id: id });
        return deletedDoc;
    }

    static async get(id){
        const findDoc = await this.model.findOne({ _id: id });
        return findDoc;
    }

    static async getAll(query){
        const findAllDocs = await DocModel.find(query).sort({ createdAt: -1 });
        return findAllDocs;
    }
}

module.exports = CardapioRepository;
