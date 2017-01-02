/**
 * Project     : flashair2
 * Component   : FileTransferService
 * Author      : Giovanni Ortu
 * eMail       : giovanni.ortu@abinsula.com
 * Module name : examples
 * Description :
 */

// APPNAME, APPMODE ("STA" or "AP")
var flashair = require('../lib')('flashair', 'STA')

var url = require('url'),
  http = require('http')

flashair.command.getFileList('/DCIM/101CANON', function (err, res) {
  if (err) {
    console.log('Error:', err)
    throw err
  }

  console.log(res)
})

flashair.command.getMACAddress(function (err, res) {
  if (err) {
    console.log('Error:', err)
    throw err
  }

  console.log(res)
})

