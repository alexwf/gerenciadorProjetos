const atividadeModel = require('../models/Atividade');

const criarAtividade = async (req, res) => {
  const { id_projeto, nome, data_inicio, data_fim, finalizada } = req.body;

  if (!id_projeto || !nome || !data_inicio || !data_fim) {
    return res.status(400).json({ error: 'Preencha todos os campos obrigatórios!' });
  }

  try {
    const [id] = await atividadeModel.criarAtividade(id_projeto, nome, data_inicio, data_fim, finalizada);
    res.status(201).json({ message: 'Atividade criada com sucesso!', id });
  } catch (err) {
    console.error('Erro ao inserir atividade:', err);
    res.status(500).json({ error: 'Erro ao criar atividade.' });
  }
};

const listarAtividades = async (req, res) => {
  try {
    const atividades = await atividadeModel.listarAtividades();
    res.status(200).json(atividades);
  } catch (err) {
    console.error('Erro ao listar atividades:', err);
    res.status(500).json({ error: 'Erro ao listar atividades.' });
  }
};

const listarAtividadesPorProjeto = async (req, res) => {
  try {
    const { id_projeto } = req.params;
    const atividades = await atividadeModel.listarAtividadesPorProjeto(id_projeto);
    res.status(200).json(atividades);
  } catch (err) {
    console.error('Erro ao listar atividades:', err);
    res.status(500).json({ error: 'Erro ao listar atividades.' });
  }
};

module.exports = {
  criarAtividade,
  listarAtividades,
  listarAtividadesPorProjeto
};