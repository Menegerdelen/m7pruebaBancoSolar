const { Model, DataTypes } = require("sequelize");
const sequelize = require("../data/conexion");
const Usuario = require("./usuarios");


class Transferencia extends Model{}
Transferencia.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        emisor: { type: DataTypes.INTEGER },
        receptor: { type: DataTypes.INTEGER },
        monto: { type: DataTypes.FLOAT },
        fecha: { type: DataTypes.DATE }
    },
    { sequelize, modelName:'Transferencias', tableName: 'transferencias', timestamps: false }
)


// Asociaciones
/**
Usuario.hasMany(Transferencia, { as: 'Emisor', foreignKey: 'emisor' });
Transferencia.belongsTo(Usuario, { as: 'Emisor', foreignKey: 'emisor' });

Usuario.hasMany(Transferencia, { as: 'Receptor', foreignKey: 'receptor' });
Transferencia.belongsTo(Usuario, { as: 'Receptor', foreignKey: 'receptor' }); 

, references: {model: Usuario, key: 'id'}
, references: {model: Usuario, key: 'id'}
*/

Transferencia.belongsTo(Usuario, { as: 'EmisorData', foreignKey: {name: 'emisor'} });
Transferencia.belongsTo(Usuario, { as: 'ReceptorData', foreignKey: {name: 'receptor'} });

module.exports = Transferencia;