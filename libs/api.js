/**
 * API
 *
 */

var url = require("url"),
    http = require("http");
    
var PORT=5000;

exports = module.exports = API;

function API(endpoint) {
  this.endpoint = endpoint;
}; 

API.prototype.__request = function (options, done) {
  options.query = options.query || {};
  var queryString = url.format({
    query: options.query
  });

  var opt = {
    method: options.method || "GET",
    hostname:  options.hostname,
    path: options.pathname + queryString,
    headers: {},
    port: options.port || PORT
  };


  if (opt.method.toUpperCase() === "POST") {
    opt.headers["Content-Type"] = "multipart/form-data";
  }

  var req = http.request(opt, function (res) {

    var body = "";
    res.setEncoding("utf8");
    res.on("data", function (chunk) {
      body += chunk;
    });
    res.on("end", function () {
      done(null, body);
    });
  });

  
  if (opt.method.toUpperCase() === "POST") {
    // req.write(options.data);
  }

  req.end();
};
