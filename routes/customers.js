/**
 * Created by andreistalbe on 1/23/16.
 */

var express = require('express');

var router = express.Router();

var Api         = require('../modules/api');
var Exporter    = require('../modules/exporter');
var Archiver    = require('../modules/archiver');
var Utils       = require('../modules/utils');

router.get('/download', function(req, res){

    var config      = req.app.get('config');
    var database    = req.app.get('database');
    var cache       = req.app.get('cache');

    var id          = new Date().getTime();
    var tlink       = '/file/status/' + id;

    var ttl = config.file.ttl * 60 * 1000;
    cache.put(id, {file: config.file.filename, status: config.file.status.pending}, ttl);

    res.cookie(config.cookie.name, Utils.cookieHash(id));


    var apiOpts = {
        url: config.api.url + config.api.endpoint,
        qs: req.query,
        json: true
    };

    new Api(apiOpts).getCustomers(function(err, response){
        if (err){
            console.log(err);
        }else{
            new Exporter(response['results'], function(err, files){
                if (err){
                    console.log("Error converting files")
                }else{
                    var archiver = new Archiver();
                    var archive = archiver.compress(files);

                    database.saveFile(id, config.file.filename, archive, function(err, status, document){
                        cache.put(id, {file: config.file.filename, status: status, doc: document}, ttl, function(key){
                            database.removeFile(key, function(err){
                                this.render('error', {error: {code: 503, message: err}});
                            })
                        })
                    })

                }
            })
        }
    });


    res.render('download', {tlink: tlink});
});


module.exports = router;