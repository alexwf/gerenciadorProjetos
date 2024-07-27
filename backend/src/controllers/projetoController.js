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
        const projetosComStatus = await Promise.all(projetos.map(async (projeto) => {
            const perc_conclusao = await projetoModel.calcularPorcentagemConclusao(projeto.id);
            const atrasado = await projetoModel.verificarAtraso(projeto.id, projeto.data_fim);
            return {
                ...projeto,
                perc_conclusao,
                atrasado
            };
        }));

        res.status(200).json(projetosComStatus);
    } catch (error) {
        console.error('Erro ao listar projetos:', error);
        res.status(500).json({ message: 'Erro ao listar projetos' });
    }
};

const calcularPorcentagemConclusao = async (req, res) => {
    try {
        const { id_projeto } = req.params;
        const conclusao = await projetoModel.calcularPorcentagemConclusao(id_projeto);
        res.status(200).json(conclusao);
    } catch (err) {
        console.error('Erro ao calcular conclusao:', err);
        res.status(500).json({ error: 'Erro ao calcular conclusao.' });
    }
}

module.exports = {
    criarProjeto,
    listarProjetos,
    calcularPorcentagemConclusao
};