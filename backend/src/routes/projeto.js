const express = require('express');
const router = express.Router();
const { criarProjeto, listarProjetos, listarProjeto, excluirProjeto, calcularPorcentagemConclusao } = require('../controllers/projetoController');

router.post('/criarProjeto', criarProjeto);
router.get('/listarProjetos', listarProjetos);
router.get('/listarProjetos/:id_projeto', listarProjeto);
router.delete('/excluirProjeto/:id_projeto', excluirProjeto);
router.get('/conclusaoProjeto/:id_projeto', calcularPorcentagemConclusao);

module.exports = router;