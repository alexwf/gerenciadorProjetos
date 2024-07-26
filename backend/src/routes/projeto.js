const express = require('express');
const router = express.Router();
const {criarProjeto, listarProjetos} = require('../controllers/projetoController');

router.post('/criarProjeto', criarProjeto);
router.get('/listarProjetos', listarProjetos);

module.exports = router;