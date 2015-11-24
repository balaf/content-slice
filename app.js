'use strict';

var redis = require("redis"),
    utils = require("./utils"),
    client = redis.createClient();


client.on("error", function (err) {
  console.log("Error " + err);
});


var startDate = new Date();

var SIZE = 1000000;
for (var i=1;i<=SIZE;i++) {
  var date = utils.getRandomFromDate();
  //console.log("FROM DATE: "+i, " " + date + " " + date.getTime());
  client.ZADD("fromSet",date.getTime(), i);
}

for (var i=1;i<=SIZE;i++) {
  var date = utils.getRandomToDate();
  //console.log("TO DATE: "+i, " " + date + " " + date.getTime());
  client.ZADD("toSet",date.getTime(), i);
}

var endDate = new Date();

console.log('=======');
console.log("Started:", startDate.getTime());
console.log("Ended:", endDate.getTime());
var diff = endDate.getTime() - startDate.getTime()

console.log("Orederd set created in "+ diff + " miliseconds");
