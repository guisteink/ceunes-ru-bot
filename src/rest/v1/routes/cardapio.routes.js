const { Router } = require('express');
const cardapioCtrl = require('../controllers/cardapio.controller');

const router = Router();

router
    .get('/', (req, res) => cardapioCtrl.getDayMenu(req, res));
    // !add another routes here

module.exports = router;
