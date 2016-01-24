/**
 * Created by andreistalbe on 1/23/16.
 */

var async       = require('async');
var json2csv    = require('json2csv');
var json2xls    = require('node-xlsx');

var Exporter = function (data, clb) {

    var self = this;

    async.parallel({
        csv: function(cb){
            self.csv(data, cb);
        },
        xls: function(cb){
            self.xls(data, cb);
        }
    }, function(err, result){
        if (err){
            clb(err);
        }else{
            clb(null, result);
        }
    });

};


Exporter.prototype.csv = function(data, callback){

    json2csv({data: data}, function(err, csv){
        if (err){
            console.log(err);
            callback(err, csv);
        }else{
            callback(null, csv)
        }
    });
};


Exporter.prototype.xls = function(data, callback){
    var content = [];
    var headers = Object.keys(data[0]);

    content.push(headers);
    for (var i = 0; i < data.length; i++){
        var body = [];
        for(var key in headers){
            body.push(data[i][headers[key]]);
        }
        content.push(body)
    }

    var xls = json2xls.build([{name: 'Customers', data: content}]);
    callback(null, xls);
};


module.exports = Exporter;