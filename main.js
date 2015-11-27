'use strict';

var Slice = require('./contentSlice').slice,
    Adder = require('./contentSlice').adder,
    db = require('./mongo/mongoskin'),
    utils = require('./utils');


// slice data
//module.exports = function(csId, type, area, issueTypes, deliveryFormat, data ) {

var csId = 11;
var type = "dateRange";
var area = 5;
var issueTypes = 4321;
var deliveryFormat = 4321;
var data = {};
data.fromDate =  utils.getRandomFromDate();
data.toDate = utils.getRandomToDate();

var myslice = new Slice(csId, type, area, issueTypes, deliveryFormat, data);

var add = new Adder();

add.users(myslice, [5,6,7]);
add.offer(myslice,11);
add.offer(myslice,12);
add.license(myslice, 13);
add.depositFeed(myslice,14);
add.dataset(myslice,21);


console.log(myslice);
