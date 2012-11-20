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
    } else if (String(err).match(/HTTP 404/)) {
      // if robots.txt isn't there anything is fair game
      res.jsonp({google: true, bing: true})
    } else {
      // uhoh some other error occurred
      res.jsonp({error: String(err)});
    }
  });
});

app.listen(4000);


