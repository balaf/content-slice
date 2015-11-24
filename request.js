'use strict';

var utils = require('./utils');

module.exports = function() {
  this.date = utils.getRandomDate();
  this.area = utils.getRandomArea();
  this.userId = utils.getRandomUsers(10);  // will add 10 user IDs
  this.pubAgentType = utils.getRandomPubAgentType();
  this.articleType = utils.getRandomArticlyType();
  this.tags = utils.getRandomTags(10);
  this.issueType = utils.getRandomIssueType();
  this.doi = utils.getRadomDOI();
  this.doiAncestors = [];
}
