'use strict';

var mssql = require('./db');

var query = new Map();



var PUBS_WITH_DATE = "select Publication.PubID, DOI, Area, DateValue, PubAgentType from PUBLICATION, PUB_DATE Where PUBLICATION.PubId = PUB_DATE.PubID AND PUB_DATE.DateType=460";
// ok
var GENERIC_CONTENT = "select ContentID, ContentTypeId from GENERIC_CONTENT";
var ARTICLE_TYPE_CONTENT = "select ContentID, Area, Type, PubId, ArticleTypeID from ARTICLE_TYPE_CONTENT";
var URI_CONTENT = "select ContentID, Area, URI from URI_CONTENT";
var CONTENT_FORMAT_CONTENT = "select ContentID, Area, Type, IssueTypes, PubID, Format from CONTENT_FORMAT_CONTENT";
var DATE_RANGE_CONTENT = "select ContentID, Area, Type, IssueTypes, PubID, StartDate, EndDate from DATE_RANGE_CONTENT";
var ISSUE_RANGE_CONTENT = "select ContentID, Area, Type, IssueTypes, PubID, FromVol, ToVol, FromIssue, ToIssue, fromSequence, toSequence from ISSUE_RANGE_CONTENT";
var DOI_CONTENT = "select ContentID, Area, Type from DOI_CONTENT";
var DOI_CONTENT_MEMBERS = "select ContentID, doi from DOI_CONTENT_MEMBERS";
var SLIDING_ISSUE_CONTENT = "select  ContentID, Area, Type, IssueTypes, PubID, CategoryID, Direction, Volumes, Issues from SLIDING_ISSUE_CONTENT";
var SLIDING_RANGE_CONTENT = "select ContentID, Area, Type, IssueTypes, PubID, Direction, Years, Months, Days from SLIDING_RANGE_CONTENT";
var ISSUE_TYPE_CONTENT = "select ContentID, Area, Type, PubID, IssueTypeID from ISSUE_TYPE_CONTENT";
//var TAG_CONTENT = "select ContentID, Area, Type, IssueTypes, TagID from TAG_CONTENT";

var LICENSE = "select top 10 ContentID, userID, offerID, licenseID from LICENSE";
var GENERIC_OFFER = "select ContentID, offerID from GENERIC_OFFER";
var DEPOSIT_FEED = "select ContentID, DepositFeedID from DEPOSIT_FEED where ContentID is not NULL";
var DATASET = "select ContentID, DatasetID from DATASET where ContentID is not NULL";

query.set("GENERIC_CONTENT", GENERIC_CONTENT);
query.set("ARTICLE_TYPE_CONTENT",ARTICLE_TYPE_CONTENT);
query.set("URI_CONTENT", URI_CONTENT);
query.set("CONTENT_FORMAT_CONTENT", CONTENT_FORMAT_CONTENT);
query.set("DATE_RANGE_CONTENT", DATE_RANGE_CONTENT);
query.set("ISSUE_RANGE_CONTENT", ISSUE_RANGE_CONTENT);
query.set("DOI_CONTENT", DOI_CONTENT);
query.set("DOI_CONTENT_MEMBERS", DOI_CONTENT_MEMBERS);
query.set("SLIDING_ISSUE_CONTENT", SLIDING_ISSUE_CONTENT);
query.set("SLIDING_RANGE_CONTENT", SLIDING_RANGE_CONTENT);
query.set("ISSUE_TYPE_CONTENT", ISSUE_TYPE_CONTENT);
query.set("LICENSE", LICENSE);
query.set("GENERIC_OFFER", GENERIC_OFFER);
query.set("DEPOSIT_FEED", DEPOSIT_FEED);
query.set("DATASET", DATASET);




module.exports.getContent = function(param,callback) {
  console.log("SQL Query:", query.get(param));
  mssql.query(query.get(param), function (err,results){
    callback(err,results);
  });
};
