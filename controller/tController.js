const { createTransferencia, buscarTransferencias } = require("../services/tService")



// buscar transferencias
const btController = async (req, res) => {
    try {
        const respuesta = await buscarTransferencias()
        res.status(respuesta.status).json(respuesta.datos.map(t => [t.fecha, t.EmisorData.nombre, t.ReceptorData.nombre, t.monto])
    );
    } catch (error) {
        console.log('Error controller:', error.message);
        res.status(500).json({
            msg: 'Error en el servidor',
            datos: []
        })
    
    }
}

// crear transferencia
const ctController = async (req, res) => {
    try {
        const emisor = req.body.emisor;
        const receptor = req.body.receptor;
        const monto = parseFloat(req.body.monto);
        const respuesta = await createTransferencia(emisor, receptor, monto)
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
    btController, ctController
}

