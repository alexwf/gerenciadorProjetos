const projetoModel = require('../models/Projeto');

const criarProjeto = async (req, res) => {
  const { nome, data_inicio, data_fim } = req.body;

  if (!nome || !data_inicio || !data_fim) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    const [id] = await projetoModel.criarProjeto(nome, data_inicio, data_fim);
    res.status(201).json({ message: 'Projeto criado com sucesso!', id });
  } catch (err) {
    console.error('Erro ao inserir projeto:', err);
    res.status(500).json({ error: 'Erro ao criar projeto.' });
  }
};

const listarProjetos = async (req, res) => {
  try {
    const projetos = await projetoModel.listarProjetos();
    res.status(200).json(projetos);
  } catch (err) {
    console.error('Erro ao listar projetos:', err);
    res.status(500).json({ error: 'Erro ao listar projetos.' });
  }
};

module.exports = {
  criarProjeto,
  listarProjetos
};