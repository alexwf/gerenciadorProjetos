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

const verificarAtraso = async (projetoId, dataFimProjeto) => {
    const atividades = await listarAtividadesPorProjeto(projetoId);
    const maiorDataFimAtividade = atividades.reduce((max, atividade) => {
      const dataFim = new Date(atividade.data_fim);
      return dataFim > max ? dataFim : max;
    }, new Date(0));

    return maiorDataFimAtividade > new Date(dataFimProjeto);
  }

module.exports = {
    criarProjeto,
    listarProjetos,
    calcularPorcentagemConclusao,
    verificarAtraso
};