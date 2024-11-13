const { buscarUsuarios, deleteUsuario, updateUsuario, createUsuario } = require("../services/uService")


// buscar usuarios
const buController = async (req, res) => {
    try {
        const respuesta = await buscarUsuarios()
        res.status(respuesta.status).json(respuesta.datos);
    } catch (error) {
        console.log('Error controller:', error.message);
        res.status(500).json({
            msg: 'Error en el servidor',
            datos: []
        })
    }
}

// crear usuario
const cuController = async (req, res) => {
    try {
        const nombre = req.body.nombre;
        const balance = req.body.balance;
        const respuesta = await createUsuario(nombre, balance)
        res.status(respuesta.status).json(respuesta.datos);
    } catch (error) {
        console.log('Error controller:', error.message);
        res.status(500).json({
            msg: 'Error en el servidor',
            datos: []
        })
    }
}


// actualizar usuario
const uuController = async (req, res) => {
    try {
        const id = req.params.id;
        const nombre = req.body.name;
        const balance = req.body.balance;
        const respuesta = await updateUsuario(id, nombre, balance)
        res.status(respuesta.status).json(respuesta.datos);
    } catch (error) {
        console.log('Error controller:', error.message);
        res.status(500).json({
            msg: 'Error en el servidor',
            datos: []
        })
    }
}


// borrar usuario
const duController = async (req, res) => {
    try {
        const id = req.params.id
        const respuesta = await deleteUsuario(id)
        res.status(respuesta.status).json(respuesta.datos);
    } catch (error) {
        console.log('Error controller:', error.message);
        res.status(500).json({
            msg: 'Error en el servidor',
            datos: []
        })
    }
}


module.exports = {
    buController, cuController, uuController, duController
}
