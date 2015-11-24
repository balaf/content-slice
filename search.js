'use strict';

var utils = require('./utils'),
    redis = require("redis"),
    client = redis.createClient();

var startDate = new Date();

/// find all csIDs before given date:
var givenDate = utils.getRandomDate();
console.log("Given Date: "+ givenDate + " --> " + givenDate.getTime());
client.ZRANGEBYSCORE("fromSet", givenDate.getTime(), "+inf", function (err, response) {
  if (err) throw err;
  console.log('Range By Score:', response[1]);
  // write your code here
  var endDate = new Date();

  console.log('=======');
  console.log("Started:", startDate.getTime());
  console.log("Ended:", endDate.getTime());
  var diff = endDate.getTime() - startDate.getTime()

  console.log("Operation finished in "+ diff + " miliseconds");
});
