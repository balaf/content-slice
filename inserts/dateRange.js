db.getCollection('contentSlice').insert(
  {
    "csId" : 5,
    "csType" : "dateRange", //date range
    "deliveryFormat": 1234, ///bitmap  e.g. (abstract, pdf etc)
    "issueTypes": 1234,  // bitmap e.g. (normal, all, current)
    "area": 4, // e.g. production, staging
    "users" : [1,2,3,4],   // /via license_t
    "offers" : [1,2,3,4,5],   // via offer
    "licenses" : [1,2,3,4],
    "depositFeeds" : [1,2,3],
    "datasets": [1,2,3],
    "conditional" : true,
    "fromDate" : ISODate("2001-09-04T04:00:00.000Z"),
    "toDate" : ISODate("2005-09-04T04:00:00.000Z")
  }
)
