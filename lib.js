/**
 * node-flashair
 * Flashair API Wrapper
 */

// default
var APPNAME = "flashair";
var APPMODE = "STA"; // or AP

var Libs = require("./libs"),
    hostname = require("os").hostname();
 
module.exports = function (appname, appmode) {
  // API End-point
  var endpoint = appname || APPNAME;
  APPMODE = appmode || APPMODE;

  // add .local for Mac
  if (APPMODE === "STA" && hostname !== "local" && hostname.split(".").slice(-1)[0] === "local") {
    endpoint += ".local";
  }

  return new Libs(endpoint);
};
