/**
 * libs
 *
 */ 


var Command = require("./command");
var Config = require("./config");

exports = module.exports = Libs;

function Libs(endpoint) {
  this.command = new Command(endpoint);
  this.config = new Config(endpoint);
};
