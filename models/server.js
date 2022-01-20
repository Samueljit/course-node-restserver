const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../DB/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // connect to db
        this.connectDB();

        // middlewares
        this.middlewares();
        
        // app routes
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // reading and parsing the body
        this.app.use(express.json());

        // public directory
        this.app.use( express.static('public'));
        
    }

    routes() {  
        this.app.use(this.usersPath, require('../routes/users'));
    }

    listen() {
        this.app.listen( this.port , () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}


module.exports = Server;