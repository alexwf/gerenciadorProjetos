const express = require('express');
const router = express.Router();
const {criarAtividade, listarAtividades, listarAtividadesPorProjeto} = require('../controllers/atividadeController');

router.post('/criarAtividade', criarAtividade);
router.get('/listarAtividades', listarAtividades);
router.get('/listarAtividades/:id_projeto', listarAtividadesPorProjeto);

module.exports = router;