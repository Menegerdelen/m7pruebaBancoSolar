const { Model, DataTypes } = require("sequelize");
const sequelize = require("../data/conexion");

class Usuario extends Model{}
Usuario.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: { type: DataTypes.STRING(100), allowNull: false },
        balance: { type: DataTypes.FLOAT, validate: { min: 0 } }
    },
    { sequelize, modelName: 'Usuarios', tableName: 'usuarios', timestamps: false }
)

module.exports = Usuario;