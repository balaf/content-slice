'use strict';

var redis = require("redis"),
    client = redis.createClient();


client.on("error", function (err) {
  console.log("Error " + err);
});


var startDate = new Date();

var SIZE = 1000000;
for (var i=1;i<=SIZE;i++) {
  var date = randomFromDate();
  //console.log("FROM DATE: "+i, " " + date + " " + date.getTime());
  client.ZADD("fromSet",date.getTime(), i);
}

for (var i=1;i<=SIZE;i++) {
  var date = randomToDate();
//  console.log("FROM TO: "+i, " " + date + " " + date.getTime());
  client.ZADD("toSet",date.getTime(), i);
}

var endDate = new Date();

console.log('=======');
console.log("Started:", startDate.getTime());
console.log("Ended:", endDate.getTime());
var diff = endDate.getTime() - startDate.getTime()

console.log("Orederd set created in "+ diff + " miliseconds");



function randomFromDate() {
  return randomDate(new Date(2000,0,1), new Date(2010,0,1));
}

function randomToDate() {
  return randomDate(new Date(2011,0,1), new Date());
}


function randomDate(start,end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
