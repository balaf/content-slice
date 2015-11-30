'use strict';

var async = require('async'),
    mssql = require('./index');


///
console.log("Started at :", new Date());


async.series([
  waitForConnection,
  makeQuery
], function(err,result) {
  if (err)
    throw err;
  console.log("Done !!: ", new Date());
})

function makeQuery(callback){
  console.log("Importing Data from GENERIC_CONTENT");
  mssql.getContent("ARTICLE_TYPE_CONTENT", function(err, content){
    if (err)
      callback(err);
    else {
      for (let i=0;i<content.length;i++){
        console.log("content:", JSON.stringify(content[i]));
      }
    }
  });
}

function waitForConnection(callback) {
  console.log("Waiting for DB connection to be established")
  setTimeout(function() {
    console.log("Done waiting...");
    callback(null);
  }, 1000);
}
