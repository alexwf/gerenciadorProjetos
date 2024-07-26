const db = require('../db/knex');

const criarAtividade = (id_projeto, nome, data_inicio, data_fim, finalizada) => {
    return db('atividade').insert({ id_projeto, nome, data_inicio, data_fim, finalizada });
};

const listarAtividades = () => {
    return db('atividade').select('*');
};

const listarAtividadesPorProjeto = (idProjeto) => {
    return db('atividade').where('id_projeto', idProjeto);
}

module.exports = {
    criarAtividade,
    listarAtividades,
    listarAtividadesPorProjeto
};