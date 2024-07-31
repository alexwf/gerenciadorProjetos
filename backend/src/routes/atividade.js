const express = require('express');
const router = express.Router();
const { criarAtividade, listarAtividades, listarAtividadesPorProjeto, excluirAtividade } = require('../controllers/atividadeController');

router.post('/criarAtividade', criarAtividade);
router.get('/listarAtividades', listarAtividades);
router.get('/listarAtividades/:id_projeto', listarAtividadesPorProjeto);
router.delete('/excluirAtividade/:id', excluirAtividade);

module.exports = router;