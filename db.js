'use strict'

var sql = require('mssql');

var config = {
  user: 'aiaa',
  password: 'aiaa20110817',
  server: '10.2.1.50', // You can use 'localhost\\instance' to connect to named instance
  database: 'literatum3_1520'
}


var PUBS_WITH_DATE = "select Publication.PubID, DOI, Area, DateValue, PubAgentType from PUBLICATION, PUB_DATE Where PUBLICATION.PubId = PUB_DATE.PubID AND PUB_DATE.DateType=460";


sql.connect(config, function(err) {
    // ... error checks
    var requestPubsWithDate = new sql.Request();
    requestPubsWithDate.stream = true; // You can set streaming differently for each request
    requestPubsWithDate.query(PUBS_WITH_DATE); // or request.execute(procedure);
    requestPubsWithDate.on('recordset', function(columns) {
        // Emitted once for each recordset in a query
    });

    request.on('error', function(err) {
        // May be emitted multiple times
    });

    request.on('done', function(returnValue) {
        // Update Indexes
    });
});

sql.on('error', function(err) {
    // ... error handler
});




var connection = new sql.Connection(config, function(err) {
    // ... error checks
    if (err)
      throw err;

    // Query

    var request = new sql.Request(connection); // or: var request = connection.request();
    request.query(' ', function(err, recordset) {
        // ... error checks
        console.log("Results: " + recordset.length);
        //console.dir(recordset);
    });

});

connection.on('error', function(err) {
    console.log("error");
});
