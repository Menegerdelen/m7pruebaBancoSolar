const { Sequelize } = require("sequelize");


const sequelize = new Sequelize('postgres://postgres:123456@localhost:5432/bancosolar');

module.exports = sequelize;