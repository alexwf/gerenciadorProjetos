const projetoModel = require('../models/Projeto');
const atividadeModel = require('../models/Atividade');

const criarProjeto = async (req, res) => {
    const { nome, data_inicio, data_fim } = req.body;

    const nomeTrimmed = nome.trim();

    if (!nomeTrimmed || !data_inicio || !data_fim) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        const [id] = await projetoModel.criarProjeto(nomeTrimmed, data_inicio, data_fim);
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

const listarProjeto = async (req, res) => {
    const { id_projeto } = req.params;

    try {
        const projeto = await projetoModel.listarProjeto(id_projeto);

        if (!projeto) {
            return res.status(404).json({ error: 'Projeto não encontrado.' });
        }

        const perc_conclusao = await projetoModel.calcularPorcentagemConclusao(projeto.id);
        const atrasado = await projetoModel.verificarAtraso(projeto.id, projeto.data_fim);

        const projetoComStatus = {
            ...projeto,
            perc_conclusao,
            atrasado
        };

        res.status(200).json(projetoComStatus);
    } catch (error) {
        console.error('Erro ao listar o projeto:', error);
        res.status(500).json({ message: 'Erro ao listar o projeto' });
    }
}

const excluirProjeto = async (req, res) => {
    const { id_projeto } = req.params;

    try {
        await atividadeModel.excluirAtividadesPorProjeto(id_projeto);
        
        const rowsAffected = await projetoModel.excluirProjeto(id_projeto);

        if (rowsAffected > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Projeto não encontrado.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Erro ao excluir projeto.' });
    }
};

const calcularPorcentagemConclusao = async (req, res) => {
    try {
        const { id_projeto } = req.params;
        const conclusao = await projetoModel.calcularPorcentagemConclusao(id_projeto);
        res.status(200).json(conclusao);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao calcular conclusao.' });
    }
}

module.exports = {
    criarProjeto,
    listarProjetos,
    listarProjeto,
    excluirProjeto,
    calcularPorcentagemConclusao
};