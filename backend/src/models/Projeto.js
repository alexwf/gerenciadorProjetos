const db = require('../db/knex');
const { listarAtividadesPorProjeto } = require('./Atividade');


const criarProjeto = (nome, data_inicio, data_fim) => {
    return db('projeto').insert({ nome, data_inicio, data_fim });
};

const listarProjetos = () => {
    return db('projeto').select('*');
};

const calcularPorcentagemConclusao = async (projetoId) => {
    const atividades = await listarAtividadesPorProjeto(projetoId);
    const totalAtividades = atividades.length;
    const atividadesConcluidas = atividades.filter(atividade => atividade.finalizada).length;
    
    return totalAtividades > 0 ? (atividadesConcluidas / totalAtividades) * 100 : 0;
}

module.exports = {
    criarProjeto,
    listarProjetos,
    calcularPorcentagemConclusao
};