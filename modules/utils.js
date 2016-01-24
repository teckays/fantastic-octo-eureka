/**
 * Created by andreistalbe on 1/23/16.
 */

var md5 = require('md5');
var config = require('../config');

module.exports = {


cookieHash: function(id){
    return md5(id + config.cookie.salt);
}


};