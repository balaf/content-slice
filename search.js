'use strict';

var redis = require("redis"),
    client = redis.createClient();


function randomDate() {
  var start = new Date(2000,0,1);
  var end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
