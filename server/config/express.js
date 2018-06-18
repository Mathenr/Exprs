let express = require('express');
let Routing = require('../app/routing');
let bodyParser = require('body-parser');
let cors = require('cors');

module.exports = function() {

    let app = express();
    app.set("port", 3000);
 /*   app.use(express.static('./public')); */
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
     });

    Routing(app);
    return app;
}