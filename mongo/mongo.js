'use strict';

// some basic config
// TODO: move to configuration file
var DB_HOST = 'localhost';
var DB_PORT = '27017';
var DB_NAME = 'local';
/////////////////
/////////////////

var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

var dbServerOptions;
dbServerOptions = {
    auto_reconnect: true,
    poolSize: 5,
    socketOptions: {
        timeout: 0, // no timeout (seconds)
        noDelay: true,  // default value = disables the Nagle algorithm
        keepAlice: 0, // default value
        encoding: null // other options: utf8,ascii,base64
    }
};


var dbOptions;
dbOptions = {
    w: 'majority',
    wtimeout: 0,
    journal: true,
    readPreference: 'ReadPreference.PRIMARY'
};


var server = new Server(DB_HOST, DB_PORT, dbServerOptions);
var db = new Db(DB_NAME, server, dbOptions);

// open connection pool (default is 5 connections)
// The 'open' method returns a db object
db.open(dbReady);

function dbReady(err, db) {
    if (err) {
        console.log('DB connection Error:', err);
    }
    else {
        console.log('DB is ready');
    }

}


db.on('close', function (err) {
    if (dbServerOptions.auto_reconnect === true) {
        console.log('DB Connection closed');
        console.log('DB auto reconnect is enabled');
    }
    else {
        console.log('DB Connection closed');
    }
});


process.on('exit', function () {
    db.close();
    console.log('Closing DB Connections...');
});

module.exports = db;
