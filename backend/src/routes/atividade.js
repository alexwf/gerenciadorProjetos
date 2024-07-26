const express = require('express');
const router = express.Router();
const {criarAtividade, listarAtividades} = require('../controllers/atividadeController');

router.post('/criarAtividade', criarAtividade);
router.get('/listarAtividades', listarAtividades);

module.exports = router;