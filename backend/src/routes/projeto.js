const express = require('express');
const router = express.Router();
const {criarProjeto, listarProjetos, calcularPorcentagemConclusao} = require('../controllers/projetoController');

router.post('/criarProjeto', criarProjeto);
router.get('/listarProjetos', listarProjetos);
router.get('/conclusaoProjeto/:id_projeto', calcularPorcentagemConclusao);

module.exports = router;