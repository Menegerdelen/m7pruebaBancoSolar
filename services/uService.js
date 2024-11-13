const Usuario = require("../models/usuarios")


const buscarUsuarios = async () => {
    try {
        const usuarios = await Usuario.findAll()
        if (usuarios.length === 0) {
            return {
                msg: 'No hay datos en la tabla',
                status: 204,
                datos: []
            }
        }
        return {
            msg: 'Los datos consultados son: ',
            status: 200,
            datos: usuarios.map(usuario => usuario.toJSON())
        }
    } catch (error) {
        console.log('Error service:', error.message);
        return{
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        }
    }
    
}

const createUsuario = async (nombre, balance) => {
    try {
        const usuario = await Usuario.create({nombre, balance})
        return{
            msg: 'Se ha añadido el usuario',
            status: 201,
            datos: usuario.toJSON()
        }
    } catch (error) {
        console.log('Error service:', error.message);
        return {
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        }
    }
}

const updateUsuario = async (id, nombre, balance) => {
    try {
        await Usuario.update({nombre, balance}, {where: {id}})
        const usuario = await Usuario.findOne({where: {id}})
        return{
            msg: `El usuario con id ${id} se actualizo correctamente`,
            status:200,
            datos: usuario.toJSON()
        }
    } catch (error) {
        console.log('Error service:', error.message);
        return {
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        }
    }
}

const deleteUsuario = async (id) => {
    try {
        await Usuario.destroy({where: {id}})
        const usuarios = await Usuario.findAll()
        return{
            msg: `El usuario con id ${id} ha sido borrado`,
            status: 200,
            datos: usuarios.map(usuario => usuario.toJSON())
        }
    } catch (error) {
        console.log('Error service:', error.message);
        return{
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        }
    }
}

module.exports = {
    buscarUsuarios, createUsuario, updateUsuario, deleteUsuario
}