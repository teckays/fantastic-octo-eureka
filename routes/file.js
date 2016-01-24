/**
 * Created by andreistalbe on 1/23/16.
 */

var express = require('express');
var router = express.Router();

var Utils = require('../modules/utils');

router.get('/status/:id', function(req, res){

    var config = req.app.get('config');

    var id = req.params['id'];
    var cache = req.app.get('cache');
    var worker = cache.get(id);

    if (!worker){
        res.render('error', {
            error: {
                code: 500,
                message: "Worker with job id: " + id + " does not exist or has expired!"
            }});
        return;
    }

    // Uncomment for direct (no status page) download
    //if(worker.status == config.file.status.done){
    //    // redirect to download page
    //    res.redirect('/file/download/' + id);
    //    return;
    //}

    var href = '/file/download/' + id;

    res.render('status', {
        title: "Retently worker status",
        worker: worker,
        href: href,
        status: config.file.status
    })

});


router.get('/download/:id', function(req, res){

    var id = req.params['id'];
    var cookies = req.cookies;
    var config = req.app.get('config');

    if (!cookies[config.cookie.name] || (cookies[config.cookie.name] !== Utils.cookieHash(id))) {
        res.render('error', {error: {code: 403, message: "Access Denied!"}});
        return;
    }

    var database = req.app.get('database');
    database.readFile(id, function(err, stream){
        if (err){
            res.render('error', {error: {code: 500, message: "There's a problem reading this file from the database"}})
        }else{
            stream.pipe(res);
        }
    })

});


module.exports = router;