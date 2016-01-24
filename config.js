/**
 * Created by andreistalbe on 1/23/16.
 */

var config              = {};
config.api              = {};
config.db               = {};
config.file             = {};
config.cookie           = {};


config.port             = 3000;


config.api.url          = 'https://pure-island-2586.herokuapp.com';
config.api.endpoint     = '/v1/customers';


config.db.host          = 'ds047865.mongolab.com';
config.db.user          = 'retently';
config.db.password      = 'retently';
config.db.port          = 47865;
config.db.db            = 'retently';


config.file.filename    = 'customers.zip';
config.file.ttl         = 20;


config.file.status          = {};
config.file.status.pending  = 0;
config.file.status.done     = 1;
config.file.status.error    = 2;

config.cookie.name      = 'sessd';
config.cookie.salt      = 'retently';


module.exports = config;