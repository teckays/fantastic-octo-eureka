/**
 * Created by andreistalbe on 1/23/16.
 */

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var Grid = require('gridfs-stream');

var config = require('../config');

module.exports = {

    config: null,

    db: null,

    gridfs: null,


    ready: function(app, next){
        this.config = app.get('config');
        this.init(next);
    },

    init: function(next){
        var self = this;

        MongoClient.connect('mongodb://' +
            this.config.db.user     + ':' +
            this.config.db.password + '@' +
            this.config.db.host     + ':' +
            this.config.db.port     + '/' +
            this.config.db.db,
            function (err, db) {
                if (err) return next(err);

                console.log('MongoDB connection established');

                //module.exports = {
                //    db: db,
                //    gridfs: Grid(db, mongodb)
                //};

                self.db = db;
                self.gridfs = Grid(db, mongodb);

                next();
        });
    },

    saveFile: function(id, name, file, clb){

        var writestream = this.gridfs.createWriteStream({
            _id: id.toString(),
            filename: name
        });

        file.pipe(writestream);

        writestream.on('error', function(err){
            clb(err, config.file.status.error, null)
        });

        writestream.on('close', function(doc){
            clb(null, config.file.status.done, doc)
        })

    },


    removeFile: function(id, clb){
        this.gridfs.remove({_id: id}, function(err){
            if (err) clb(err);
        })
    },


    readFile: function(id, clb){
        var readStream = this.gridfs.createReadStream({_id: id});

        readStream.on('error', function(err){
            clb(err);
        });

        clb(null, readStream);
    }

};