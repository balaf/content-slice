'use strict';

var Slice = require('./contentSlice').slice,
    Adder = require('./contentSlice').adder,
    db = require('./mongo/mongoskin'),
    utils = require('./utils');


// slice data
//module.exports = function(csId, type, area, issueTypes, deliveryFormat, data ) {
var add = new Adder();
var csId = 11;
var type = "dateRange";
var area = 5;
var issueTypes = 4321;
var deliveryFormat = 4321;
var data = {};
data.fromDate =  utils.getRandomFromDate();
data.toDate = utils.getRandomToDate();

var myslice = new Slice(csId, type, area, issueTypes, deliveryFormat, data);

db.insert(myslice, function(err,result){
  if (err)
    throw err;
  console.log(result);


  myslice.fromDate = new Date();
  myslice.toDate = new Date();

  db.update({csId: csId}, myslice, function(err, result) {
    if (err)
      throw err;
    console.log("Update::  ", result);

    add.users(myslice, [5,6,7]);
    add.offer(myslice,11);
    add.offer(myslice,12);
    add.license(myslice, 13);
    add.depositFeed(myslice,14);
    add.dataset(myslice,21);

    db.update({csId: csId}, myslice, function(err, result) {
      if (err)
        throw err;
      console.log("Update::::  ", result);
    });
  });
});
