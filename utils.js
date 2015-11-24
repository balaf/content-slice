'use strict'

var Chance = require('chance'),
    _ = require('underscore');

var chance = new Chance();

var AREAS = ['live', 'staging'];
var MAXUSERS = 100000;
var USERIDS = _.range(100000,100000+MAXUSERS);


module.exports.getRandomArea = function () {
  return AREAS[chance.integer({min: 0, max: 1})];
}

module.exports.getRandomUsers = function (size) {
  let users = [];
  for (let i=1;i<=size;i++){
    users.push(USERIDS[chance.integer({min:0,max:MAXUSERS})]);
  }
  return users;
}

function getRandomDate(s,e) {
  var start = s || new Date(2000,0,1);
  var end = e || new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

module.exports.getRandomDate = getRandomDate;
module.exports.getRandomFromDate = function() {
  return getRandomDate(new Date(2000,0,1), new Date(2010,0,1));
};

module.exports.getRandomToDate = function () {
  return getRandomDate(new Date(2011,0,1), new Date());
};
