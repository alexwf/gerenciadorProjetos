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

const excluirAtividadesPorProjeto = (projetoId) => {
    return db('atividade').where({ id_projeto: projetoId }).del();
}

const excluirAtividade = (id) => {
    return db('atividade')
        .where({ id })
        .del();
}

module.exports = {
    criarAtividade,
    listarAtividades,
    listarAtividadesPorProjeto,
    excluirAtividadesPorProjeto,
    excluirAtividade
};