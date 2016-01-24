/**
 * Created by andreistalbe on 1/23/16.
 */

var request = require('request');

var Api = function(options){

    if (!options.url) throw new Error('No Api URL specified');
    this.options = options;

};


Api.prototype.getCustomers = function(clb){

    request(this.options, function(err, response, body){
        if (err){
            return clb(err);
        }else if(response.statusCode !== 200){
            return clb(body);
        }else{
            return clb(null, body)
        }
    })

};


module.exports = Api;