'use strict';

module.exports.slice = function(csId, type, area, issueTypes, deliveryFormat, data ) {
  this.csId = csId;
  if (type)
    this.type = type;
  if (area)
    this.area = area;
  if (issueTypes)
    this.issueTypes = issueTypes;
  if (deliveryFormat)
   this.deliveryFormat = deliveryFormat;

  this.users = [];
  this.licenses = [];
  this.offers = [];
  this.depositFeeds = [];
  this.datasets = [];

  if (data) {
    if (data.fromDate)
      this.fromDate = data.fromDate;
    if (data.toDate)
      this.toDate = data.toDate;
    if (data.articleType)
      this.articleType = data.articleType;
    if (data.uri)
       this.uri = data.uri;
    if (data.doi)
      this.doi = data.doi;
    if(data.tags)
      this.tags = data.tags;
  }
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
