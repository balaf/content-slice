var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/local", {native_parser:true});
db.bind('contentSlice');
db.contentSlice.find({},{csId:1}).toArray(function(err, items) {
       console.log(items)
        db.close();
});
