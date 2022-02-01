const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../DB/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        
        this.paths = {
            auth: '/api/auth',
            categories: '/api/categories',
            products: '/api/products',
            users: '/api/users',
            searchFor: '/api/searchFor',
            uploads: '/api/uploads',
        }
        

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

        // FileUploads
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
        
    }

    routes() {  

        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.users, require('../routes/users'));
        this.app.use(this.paths.categories, require('../routes/categories'));
        this.app.use(this.paths.products, require('../routes/products'));
        this.app.use(this.paths.searchFor, require('../routes/search-for'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
    }

    listen() {
        this.app.listen( this.port , () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}


module.exports = Server;