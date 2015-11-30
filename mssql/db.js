'use strict'

var sql = require('mssql');
var request;

var config = {
  user: 'aiaa',
  password: 'aiaa20110817',
  server: '10.2.1.50', // You can use 'localhost\\instance' to connect to named instance
  database: 'literatum3_1520'
}

sql.connect(config, function(err) {
    if (err)
      throw err;
    console.log("SQL SERVER Connection Established");

});

sql.on('error', function(err) {
    console.log("SQL Connection Error");
});

module.exports = new sql.Request();
