const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    campus: { type: String}, //sm, vix ou alegre
    type: { type: String }, // almoco ou jantar
    meat: { type: String}, // tipo de carne
    option: { type: String }, // opcao extra
    garnish: { type: String }, // guarnicao (macarrao, arroz e feijao, etc)
    salad: { type: String }, // salada
    dessert: { type: String }, //sobremesa
    createdBy: { type: String, default: 'app' }, // app, api (rota ou bot),

}, { timestamps: true });

module.exports = MenuSchema;
