'use strict';

module.exports.slice = function(csId, type, area, issueTypes, deliveryFormat, data ) {
  this.csId = csId;
  this.type = type;
  this.area = area;
  this.issueTypes = issueTypes;
  this.deliveryFormat = deliveryFormat;

  this.users = [];
  this.licenses = [];
  this.offers = [];
  this.depositFeeds = [];
  this.datasets = [];

  this.fromDate = data.fromDate;
  this.toDate = data.toDate;
  this.articleType = data.articleType;
  this.uri = data.uri;
  this.doi = data.doi;
  this.tags = data.tags;
}

module.exports.adder = function() {
  this.offer = function(slice, offer) {
    slice.offers.push(offer);
  };
  this.depositFeed = function(slice, feed) {
    slice.depositFeeds.push(feed);
  };
  this.users = function(slice, users) {
    for (let i=0;i<users.length;i++) {
      slice.users.push(users[i]);
    }
  };
  this.license = function(slice, license) {
    slice.licenses.push(license);
  };
  this.dataset = function(slice,dataset) {
    slice.datasets.push(dataset);
  };
}
