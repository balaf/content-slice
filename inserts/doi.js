db.getCollection('contentSlice').insert(
  {
    "csId" : 6,
    "csType" : "doi", //date range
    "deliveryFormat": 1234, ///bitmap  e.g. (abstract, pdf etc)
    "issueTypes": 1234,  // bitmap e.g. (normal, all, current)
    "area": 4, // e.g. production, staging
    "users" : [1,2,3,4],   // /via license_t
    "offers" : [1,2,3,4,5],   // via offer
    "licenses" : [1,2,3,4],
    "depositFeeds" : [1,2,3],
    "datasets": [1,2,3],
    "conditional" : true,
    "doi" : [
        "10.1.100",
        "10.1.200",
        "10.1.100/abc",
        "10.1.100/abc.100"
    ]
  }
)
