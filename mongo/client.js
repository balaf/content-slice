'use strict';

var db = require("./index");


var contentSlice = db.collection('contentSlice');

contentSlice.find({}).toArray(function (err, results){
  console.log(results);
});
