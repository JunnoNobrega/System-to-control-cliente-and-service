// Conexão com o servidor/banco de dados

var knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'Admin@2023',
        database: 'dbinfox'
    }
});

module.exports = knex