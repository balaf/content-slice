db.getCollection('contentSlice').insert(
  {
    "csId" : 2,
    "csType" : "uri", //date range
    "deliveryFormat": 1234, ///bitmap  e.g. (abstract, pdf etc)
    "issueTypes": 1234,  // bitmap e.g. (normal, all, current)
    "area": 4, // e.g. production, staging
    "users" : [1,2,3,4],   // /via license_t
    "offers" : [1,2,3,4,5],   // via offer
    "licenses" : [1,2,3,4],
    "depositFeeds" : [1,2,3],
    "datasets": [1,2,3],
    "uri" : "/a/b/c/10.1.100",
    "conditional" : true
  }
)
