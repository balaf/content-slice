var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/local", {native_parser:true});
db.bind('contentSlice');

module.exports = db.contentSlice;
