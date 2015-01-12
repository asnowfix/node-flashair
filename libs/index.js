/**
 * libs
 *
 */ 


var Command = require("./command");

exports = module.exports = Libs;

function Libs(endpoint) {
  this.command = new Command(endpoint);
};
