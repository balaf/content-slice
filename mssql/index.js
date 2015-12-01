'use strict';

//var mssql = require('./db');

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
var NUMBER_OF_ISSUES_CONTENT = "select ContentID, Area, Type, IssueTypes, PubID, StartDate, startVol, startIssue, NumberOfIssues from NUMBER_OF_ISSUES_CONTENT";
var TAG_CONTENT = "select ContentID, Area, Type, IssueTypes, TagID from TAG_CONTENT";
var TAG_PARENT = "select tagid from TAG_PARENT where parentID=";

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
query.set("NUMBER_OF_ISSUES_CONTENT", NUMBER_OF_ISSUES_CONTENT);
query.set("TAG_CONTENT", TAG_CONTENT);
query.set("TAG_PARENT", TAG_PARENT);


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

// 
// function getTagChildren (parent, callback) {
//   var finalResult = [];
//
//   var findChidrenCbk = function (parent, function(err,results){
//     finalResult.push(parent.tagid);
//     for (let i=0;i<results.length;i++) {
//       findChildren(results[i], findChildrenCbk)
//     }
//   };
//   //mssql.query("select tagid from TAG_PARENT where parentid="+parent, function (err,results){
//   findChildren(parent,findChidrenCbk)
// }


var start = {
  'c' : { tagid:3, children: []},
  'd' : { tagid:4, children: []},
  'g' : { tagid:7, children: []},
  'f' : { tagid:6, children: []},
  'e' : { tagid:5, children: ['f']},
  'b' : { tagid:2, children: ['c','d']},
  'a' : { tagid:1, children: ['b','e']},
  root : {tagid:0, children: ['a','g']}
};

function findChildren(parent, callback) {
  setTimeout(function(){
    console.log("Children of "+parent.tagid+" are "+ parent.children);
    var results = [];
    console.log("Number of Children:", parent.children.length);
    for (let i=0;i<parent.children.length;i++) {
      console.log("Pushing Child["+ i+ "]:", parent.children[i]);
      results.push(start[parent.children[i]]);
    }
    callback(null,results)
  }, 1000)
};


function findChildrenPlain(parent) {
  var results = [];
  for (let i=0;i<parent.children.length;i++) {
    results.push(findChildrenPlain(start[parent.children[i]]));
  }
  return results;
}

console.log(findChildrenPlain(start['b']));

//
// getTagChildren(start['b'], function(err,result) {
//   console.log("-------------Final result:", result);
// });
