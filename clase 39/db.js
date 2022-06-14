const { Sequelize } = require('sequelize');

const db = new Sequelize('clase39DB', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306'

})

module.exports = { db };