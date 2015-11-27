db.getCollection('contentSlice').insert(
  {
    "csId" : 7,
    "csType" : "collection", //date range
    "deliveryFormat": 1234, ///bitmap  e.g. (abstract, pdf etc)
    "issueTypes": 1234,  // bitmap e.g. (normal, all, current)
    "area": 4, // e.g. production, staging
    "users" : [1,2,3,4],   // /via license_t
    "offers" : [1,2,3,4,5],   // via offer
    "licenses" : [1,2,3,4],
    "uri" : "/a/b/c/10.1.100",
    "condition" : true,
    "members": [71, 72]
  }
)

db.getCollection('contentSlice').insert(
  {
    "csId" : 71,
    "csType" : "dateRange", //date range
    "deliveryFormat": 1234, ///bitmap  e.g. (abstract, pdf etc)
    "issueTypes": 1234,  // bitmap e.g. (normal, all, current)
    "area": 4, // e.g. production, staging
    "condition" : true,
    "fromDate" : ISODate("2006-09-04T04:00:00.000Z"),
    "toDate" : ISODate("2009-09-04T04:00:00.000Z"),
    "parent" : 7
  }
)

db.getCollection('contentSlice').insert(
  {
    "csId" : 72,
    "csType" : "uri", //date range
    "deliveryFormat": 1234, ///bitmap  e.g. (abstract, pdf etc)
    "issueTypes": 1234,  // bitmap e.g. (normal, all, current)
    "area": 4, // e.g. production, staging
    "users" : [1,2,3,4],   // /via license_t
    "offers" : [1,2,3,4,5],   // via offer
    "licenses" : [1,2,3,4],
    "condition" : true,
    "doi" : [
        "10.2.100",
        "10.2.200",
        "10.2.100/abc",
        "10.2.100/abc.100"
    ],
    "parent": 7
  }
)
