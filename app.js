var url = require("url"),
    async = require("async"),
    express = require("express"),
    lookup = require("./lib/lookup").lookup;

var app = express();

app.get('/robots', function(req, res) {
  var url = req.query.url;
  console.log(url);
  lookup(url, function(err, results) {
    if (!err) {
      res.jsonp(results);
    } else {
      res.jsonp({error: String(err)});
    }
  });
});

app.listen(4000);


