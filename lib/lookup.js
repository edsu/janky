var url = require("url"),
    async = require("async"),
    robots = require("robots");

function lookup(lookupUrl, callback) {
  var u = url.parse(lookupUrl);
  var robotsUrl = u.protocol + '//' + u.host + '/robots.txt';
  var parser = new robots.RobotsParser();
  parser.setUrl(robotsUrl, function(parser, success) {
    if (success) {
      async.parallel(
        {
          "*": function(cb) {
            parser.canFetch("*", u.path, function(access) {
              cb(null, access);
            });
          },
          "google": function(cb) {
            parser.canFetch(ua.google, u.path, function(access) {
              cb(null, access);
            });
          },
          "bing": function(cb) {
            parser.canFetch(ua.bing, u.path, function(access) {
              cb(null, access);
            });
          },
          "pinterest": function(cb) {
            parser.canFetch(ua.bing, u.path, function(access) {
              cb(null, access);
            });
          },
          "facebook": function(cb) {
            parser.canFetch(ua.bing, u.path, function(access) {
              cb(null, access);
            });
          },
          "googleImage": function(cb) {
            parser.canFetch(ua.bing, u.path, function(access) {
              cb(null, access);
            });
          }
        },
        function(err, results) {
          callback(err, results);
        }
      );
    }
  });
}

var ua = {
  google: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
  googleImage: "Googlebot-Image/1.0",
  bing: "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
  facebook: "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
  pinterest: "Pinterest/0.1 +http://pinterest.com/",
}

exports.lookup = lookup; 
