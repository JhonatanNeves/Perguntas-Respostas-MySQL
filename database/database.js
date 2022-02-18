const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas', 'root', 'g36segopro', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;