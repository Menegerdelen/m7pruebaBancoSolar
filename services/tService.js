const sequelize = require("../data/conexion");
const Transferencia = require("../models/transferencias");
const Usuario = require("../models/usuarios");




const buscarTransferencias = async () => {
    try {
        const transferencias = await Transferencia.findAll({
            include: [
                { model: Usuario, as: 'EmisorData' }, 
                { model: Usuario, as: 'ReceptorData' }
            ]
        })
        if (transferencias.length === 0) {
            return {
                msg: 'No hay datos en la tabla',
                status: 204,
                datos: []
            }
        } else{
            return{
                msg: 'Transacciones encontradas:',
                status: 200,
                datos: transferencias.map(transferencia => transferencia.toJSON())
    
            }
        }
    } catch (error) {
        console.error('Error service:', error.message)
        return {
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        }
    }
}

/* const createTransferencia = async (emisor, receptor, monto, fecha) => {
    try {
        const transferencia = await Transferencia.create({emisor, receptor, monto, fecha})
        return{
            msg: 'Se ha añadido la transferencia',
            status: 201,
            datos: [transferencia.dataValues]
        }
    } catch (error) {
        console.log(error.message);
        return {
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        }
    }
} */

const createTransferencia = async (emisor, receptor, monto, fecha) => {
    const t = await sequelize.transaction()
    try {
        const emisorDatos = await Usuario.findOne({where: {id: emisor}, transaction: t})
        const receptorDatos = await Usuario.findOne({where: {id: receptor}, transaction: t})
        
        const emisorUpdate = await Usuario.update({balance: emisorDatos.toJSON().balance -  monto}, {where: {id: emisorDatos.toJSON().id}})
        const receptorUpdate = await Usuario.update({balance: receptorDatos.toJSON().balance + monto}, {where: {id: emisorDatos.toJSON().id}})

        const transferencia = await Transferencia.create({
            emisor: emisorDatos.toJSON().id,
            receptor: receptorDatos.toJSON().id,
            monto, fecha: Date.now()
        })
        await t.commit();

        
        const transferencias = await Transferencia.findAll()
        return{
            msg: 'Se ha realizado una transferencia exitosa',
            status: 201,
            datos: transferencias.map(transferencia => transferencia.toJSON())
        }
    } catch (error) {
        await t.rollback();
        console.log('Error service:', error.message);
        return {
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        };
    }
}

module.exports = {
    buscarTransferencias, createTransferencia
}