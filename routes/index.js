/**
 * Created by andreistalbe on 1/23/16.
 */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('index', {title: "Retently home page"})
});

module.exports = router;