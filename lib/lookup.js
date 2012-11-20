var url = require("url"),
    async = require("async"),
    robots = require("robotstxt");

function lookup(url, callback) {
  async.parallel(
    {
      google: function(callback) {
        ok(url, "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)", callback);
      },
      bing: function(callback) {
        ok(url, "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)", callback);
      },
      pinterest: function(callback) {
        ok(url, "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)", callback);
      },
      facebook: function(callback) {
        ok(url, "facebookexternalhit/1.1", callback);
        //ok(url, "facebookexternalhit/1.1", callback);
      }
    },
    function(err, results) {
      callback(err, results);
    }
  );
}

function ok(lookupUrl, ua, callback) {
  var u = url.parse(lookupUrl);
  var robotsUrl = u.protocol + "//" + u.hostname + "/robots.txt";
  var r = robots(robotsUrl, ua);
  r.on("ready", function(gk) {
    callback(null, gk.isAllowed(lookupUrl));
  });
  r.on("error", function(e) {
    callback(e, null);
  });
}

exports.lookup = lookup; 
