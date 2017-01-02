/**
 * Project     : flashair2
 * Component   : FileTransferService
 * Author      : Giovanni Ortu
 * eMail       : giovanni.ortu@abinsula.com
 * Module name : Library
 * Description :
 */

// default
var APPNAME = 'flashair'
var APPMODE = 'STA' // or AP

var Libs = require('./libs')
var hostname = require('os').hostname()

module.exports = function (appname, appmode) {
  // API End-point
  var endpoint = appname || APPNAME
  APPMODE = appmode || APPMODE

  // add .local for Mac
  if (APPMODE === 'STA' && hostname !== 'local' && hostname.split('.').slice(-1)[0] === 'local') {
    endpoint += '.local'
  }

  return new Libs(endpoint)
}

module.exports.sd = require('./libs/sd')
