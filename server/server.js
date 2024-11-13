const express = require('express');


class Server{
    constructor(){
        this.app = express();
        this.port = 3000;
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(express.json())
    }

    routes(){
        this.app.use('', require('../routes/uRoutes'))
        this.app.use('', require('../routes/tRoutes'))
    }

    listen(){
        this.app.listen(this.port, () => console.log(`Abrido puerto ${this.port}`))
    }
}



module.exports = Server;