/**
 * Project     : node-flashair
 * Component   : FileTransferService
 * Author      : Giovanni Ortu
 * eMail       : giovanni.ortu@abinsula.com
 * Module name : API
 * Description :
 */

var url = require("url"),
    http = require("http");
    
var PORT=80;

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
  
  req.on('error', function(e) {
  console.log('problem with request: ' , e);
});

  
  if (opt.method.toUpperCase() === "POST") {
    // req.write(options.data);
  }

  req.end();
};
