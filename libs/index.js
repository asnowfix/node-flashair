/**
 * libs
 *
 */ 


var Command = require("./command");
var Config = require("./config");
var Thumbnail = require("./thumbnail");

exports = module.exports = Libs;

function Libs(endpoint) {
  this.command = new Command(endpoint);
  this.config = new Config(endpoint);
  this.thumbnail = new Thumbnail(endpoint);
};
