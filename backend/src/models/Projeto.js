const db = require('../db/knex');

const criarProjeto = (nome, data_inicio, data_fim) => {
  return db('projeto').insert({ nome, data_inicio, data_fim });
};

const listarProjetos = () => {
  return db('projeto').select('*');
};

module.exports = {
  criarProjeto,
  listarProjetos
};