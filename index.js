'use strict';

var async = require('async'),
    mssql = require('./mssql'),
    db = require("./mongo"),
    GenericContent = require('./contentSlice').genericContent;


var contentSlice = db.collection('contentSlice');;


///
console.log("Started at :", new Date());


async.series([
  waitForConnection,
//  importGenericContent,
//  importArticleType,    // ok
//  importContentFormat,  // ok
//  importUriContent,     //ok
//  importDateRange,      //ok - some dates are nulll
//  importIssueRange,     //ok
//  importDoiContent,
//  importDoiContentMembers,
  importUsers,
  importOffers,
  importFeeds,
  importDatasets
], function(err,result) {
  if (err)
    throw err;
  console.log("Sucessfull Import !!: ", new Date());
})


var contentMapSet = new Map();
contentMapSet.set("ARTICLE_TYPE_CONTENT", '{"$set": {Area: value.Area, Type: value.Type, PubID: value.PubID, ArticleTypeID: value.ArticleTypeID}}');
contentMapSet.set("CONTENT_FORMAT_CONTENT", '{"$set": {Area: value.Area, Type: value.Type, IssueTypes: value.IssueTypes, PubID: value.PubID, Format: value.Format}}');
// contentMapSet.set("URI_CONTENT", {"$set": {Area: value.Area, URI: value.URI}});
// contentMapSet.set("DATE_RANGE_CONTENT", {"$set": {Area: value.Area, Type: value.Type, IssueTypes: value.IssueTypes, PubID: value.PubID, StartDate: value.StartDate, EndDate: value.EndDate}});
// contentMapSet.set("ISSUE_RANGE_CONTENT", {"$set": {Area: value.Area, Type: value.Type, PubID: value.PubID, ArticleTypeID: value.ArticleTypeID}});

function genericImport(qry, callback){
  console.log("Importing data from ", qry);
  mssql.getContent(qry, function(err, content){
    if (err)
      callback(err);
    else {
      async.forEachOf(content, function (value, key, forEachCallback) {
         var kkk = contentMapSet.get(qry);
         console.log("kkk:", kkk);
         var tmp = JSON.parse(kkk);
         console.log("tmp:",tmp)
        contentSlice.update({csID: value.ContentID}, tmp, function(err,result) {
          if (err)
            forEachCallback(err);
          else {
            forEachCallback(null,result);
          }
        })
      },
      function (err) {
        if (err)
          callback(err)
        else {
          callback(null);
        }
      });
    }
  });
}


function importGenericContent(callback){
  console.log("Reading Data from GENERIC_CONTENT");
  mssql.getContent("GENERIC_CONTENT", function(err, content){
    if (err)
      callback(err);
    else {
      console.log("Importing Data from GENERIC_CONTENT: ", content.length);
      var slices = [];
      for (let i=0;i<content.length;i++){
        let slice = new GenericContent(content[i])
        slices.push(slice);
      }
      contentSlice.insertMany(slices, function(err,results) {
           if (err)
             callback(err);
           else {
             callback(null,results);
           }
      });
    }
  });
}

function importArticleType(callback){
  console.log("Reading Data from ARTICLE_TYPE_CONTENT");
  mssql.getContent("ARTICLE_TYPE_CONTENT", function(err, content){
    if (err)
      callback(err);
    else {
      console.log("Importing Data from ARTICLE_TYPE_CONTENT:", content.length);
      async.forEachOf(content, function (value, key, forEachCallback) {
        contentSlice.update({csID: value.ContentID}, {"$set": {Area: value.Area, Type: value.Type, PubID: value.PubID, ArticleTypeID: value.ArticleTypeID}}, function(err,result) {
          if (err)
            forEachCallback(err);
          else {
            forEachCallback(null,result);
          }
        })
      },
      function (err) {
        if (err)
          callback(err)
        else {
          callback(null);
        }
      });
    }
  });
}

function importContentFormat(callback){
//  genericImport("CONTENT_FORMAT_CONTENT", callback);

  console.log("Reading Data from CONTENT_FORMAT_CONTENT");
  mssql.getContent("CONTENT_FORMAT_CONTENT", function(err, content){
    if (err)
      callback(err);
    else {
      console.log("Importing Data from CONTENT_FORMAT_CONTENT:", content.length);
      async.forEachOf(content, function (value, key, forEachCallback) {
        contentSlice.update({csID: value.ContentID}, {"$set": {Area: value.Area, Type: value.Type, IssueTypes: value.IssueTypes, PubID: value.PubID, Format: value.Format}}, function(err,result) {
          if (err)
            forEachCallback(err);
          else {
            forEachCallback(null,result);
          }
        })
      },
      function (err) {
        if (err)
          callback(err)
        else {
          callback(null);
        }
      });
    }
  });
}

function importUriContent(callback){
  console.log("Reading Data from URI_CONTENT");
  mssql.getContent("URI_CONTENT", function(err, content){
    if (err)
      callback(err);
    else {
      console.log("Importing Data from URI_CONTENT:", content.length);
      async.forEachOf(content, function (value, key, forEachCallback) {
        contentSlice.update({csID: value.ContentID}, {"$set": {Area: value.Area, URI: value.URI}}, function(err,result) {
          if (err)
            forEachCallback(err);
          else {
            forEachCallback(null,result);
          }
        })
      },
      function (err) {
        if (err)
          callback(err)
        else {
          callback(null);
        }
      });
    }
  });
}

function importDateRange(callback){
  console.log("Reading Data from DATE_RANGE_CONTENT");
  mssql.getContent("DATE_RANGE_CONTENT", function(err, content){
    if (err)
      callback(err);
    else {
      console.log("Importing Data from DATE_RANGE_CONTENT:", content.length);
      async.forEachOf(content, function (value, key, forEachCallback) {
        contentSlice.update({csID: value.ContentID}, {"$set": {Area: value.Area, Type: value.Type, IssueTypes: value.IssueTypes, PubID: value.PubID, StartDate: value.StartDate, EndDate: value.EndDate}}, function(err,result) {
          if (err)
            forEachCallback(err);
          else {
            forEachCallback(null,result);
          }
        })
      },
      function (err) {
        if (err)
          callback(err)
        else {
          callback(null);
        }
      });
    }
  });
}

function importIssueRange(callback){
  console.log("Reading Data from ISSUE_RANGE_CONTENT");
  mssql.getContent("ISSUE_RANGE_CONTENT", function(err, content){
    if (err)
      callback(err);
    else {
      console.log("Importing Data from ISSUE_RANGE_CONTENT:", content.length);
      async.forEachOf(content, function (value, key, forEachCallback) {
        fromSequence, toSequence
        contentSlice.update({csID: value.ContentID}, {"$set": {Area: value.Area, Type: value.Type, IssueTypes: value.IssueTypes, PubID: value.PubID, FromVol: value.FromVol, ToVol: value.ToVol, FromIssue: value.FromIssue, ToIssue: value.ToIssue, fromSequence: value.fromSequence, toSequence: value.toSequence}}, function(err,result) {
          if (err)
            forEachCallback(err);
          else {
            forEachCallback(null,result);
          }
        })
      },
      function (err) {
        if (err)
          callback(err)
        else {
          callback(null);
        }
      });
    }
  });
}

function importDoiContent(callback){
//  genericImport("CONTENT_FORMAT_CONTENT", callback);

  console.log("Reading Data from DOI_CONTENT");
  mssql.getContent("DOI_CONTENT", function(err, content){
    if (err)
      callback(err);
    else {
      console.log("Importing Data from DOI_CONTENT:", content.length);
      async.forEachOf(content, function (value, key, forEachCallback) {
        contentSlice.update({csID: value.ContentID}, {"$set": {Area: value.Area, Type: value.Type, doi:[]}}, function(err,result) {
          if (err)
            forEachCallback(err);
          else {
            forEachCallback(null,result);
          }
        })
      },
      function (err) {
        if (err)
          callback(err)
        else {
          callback(null);
        }
      });
    }
  });
}

function importDoiContentMembers(callback){
//  genericImport("CONTENT_FORMAT_CONTENT", callback);

  console.log("Reading Data from DOI_CONTENT_MEMBERS");
  mssql.getContent("DOI_CONTENT_MEMBERS", function(err, content){
    if (err)
      callback(err);
    else {
      console.log("Importing Data from DOI_CONTENT_MEMBERS:", content.length);
      async.forEachOf(content, function (value, key, forEachCallback) {
        contentSlice.update({csID: value.ContentID}, {"$push": {doi: value.doi}}, function(err,result) {
          if (err)
            forEachCallback(err);
          else {
            forEachCallback(null,result);
          }
        })
      },
      function (err) {
        if (err)
          callback(err)
        else {
          callback(null);
        }
      });
    }
  });
}


function importUsers(callback){
  console.log("Importing Data from LICENSE");
  mssql.getContent("LICENSE", function(err, content){
    if (err)
      callback(err);
    else {
      console.log("Importing Data from LICENSE:", content.length);
      async.forEachOf(content, function (value, key, forEachCallback) {
        console.log("contentID:", value.ContentID);

        console.log("userID:", value.userID);
        console.log("licenseID:", value.licenseID);
        contentSlice.update({csID: value.ContentID}, {"$push": {licenses: value.licenseID, users: value.userID, licOffers: value.offerID}}, function(err,result) {
          if (err)
            forEachCallback(err);
          else {
            forEachCallback(null,result);
          }
        })
      },
      function (err) {
        if (err)
          callback(err)
        else {
          callback(null);
        }
      });
    }
  });
}


function importOffers(callback){
  console.log("Importing Data from GENERIC_OFFER");
  mssql.getContent("GENERIC_OFFER", function(err, content){
    if (err)
      callback(err);
    else {
      console.log("Importing Data from GENERIC_OFFER:", content.length);
      async.forEachOf(content, function (value, key, forEachCallback) {
        contentSlice.update({csID: value.ContentID}, {"$push": {offers: value.offerID}}, function(err,result) {
          if (err)
            forEachCallback(err);
          else {
            forEachCallback(null,result);
          }
        })
      },
      function (err) {
        if (err)
          callback(err)
        else {
          callback(null);
        }
      });
    }
  });
}

function importFeeds(callback){
  console.log("Importing Data from DEPOSIT_FEED");
  mssql.getContent("DEPOSIT_FEED", function(err, content){
    if (err)
      callback(err);
    else {
      console.log("Importing Data from DEPOSIT_FEED:", content.length);
      async.forEachOf(content, function (value, key, forEachCallback) {
        contentSlice.update({csID: value.ContentID}, {"$push": {depositFeeds: value.DepositFeedID}}, function(err,result) {
          if (err)
            forEachCallback(err);
          else {
            forEachCallback(null,result);
          }
        })
      },
      function (err) {
        if (err)
          callback(err)
        else {
          callback(null);
        }
      });
    }
  });
}

function importDatasets(callback){
  console.log("Importing Data from DATASET");
  mssql.getContent("DATASET", function(err, content){
    if (err)
      callback(err);
    else {
      console.log("Importing Data from DATASET:", content.length);
      async.forEachOf(content, function (value, key, forEachCallback) {
        contentSlice.update({csID: value.ContentID}, {"$push": {datasets: value.DatasetID}}, function(err,result) {
          if (err)
            forEachCallback(err);
          else {
            forEachCallback(null,result);
          }
        })
      },
      function (err) {
        if (err)
          callback(err)
        else {
          callback(null);
        }
      });
    }
}

// Lets wait arbitraty ammount of time till DB connections are created

function waitForConnection(callback) {
  console.log("Waiting for DB connection to be established")
  setTimeout(function() {
    console.log("Done waiting...");
    callback(null);
  }, 2000);
}
