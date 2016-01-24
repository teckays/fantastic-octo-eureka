/**
 * Created by andreistalbe on 1/23/16.
 */

var archiver = require('archiver');

var Archiver = function(format) {

    this.format = format || 'zip';
    this.instance = archiver(this.format);

};


Archiver.prototype.compress = function(files){
    return this.instance
        .append(files['csv'], {name: 'customers.csv'})
        .append(files['xls'], {name: 'customers.xlsx'})
        .finalize();

};


module.exports = Archiver;