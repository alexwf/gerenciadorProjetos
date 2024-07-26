const knex = require('knex');
const knexConfig = require('../config/knexfile');

const db = knex(knexConfig);

module.exports = db;