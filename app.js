/**
 * Created by andreistalbe on 1/23/16.
 */

// 3rd party module imports
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cache = require('memory-cache');


// Instantiate APP
var app = express();


// Route imports
var indexRoute = require('./routes/index');
var customersRoute = require('./routes/customers');
var fileRoute = require('./routes/file');


// App module imports
var config = require('./config');
var database = require('./modules/database');


// Set app config
app.set('config', config);
app.set('database', database);
app.set('cache', cache);

// Set View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(cookieParser());


// Define route namespaces
app.use('/', indexRoute);
app.use('/customers', customersRoute);
app.use('/file', fileRoute);



database.ready(app, function(err){
    if (err){
        console.log("Could not establish MongoDB connection");
        throw err;
    }

    app.listen(config.port || 3000, function () {
        console.log('Retently example app listening on port', this.address().port);
        console.log('===========================\n')
        console.log('http://127.0.0.1:' + this.address().port);
        console.log('\n===========================')
    });
});
