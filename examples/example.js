/**
 * Project     : flashair2
 * Component   : FileTransferService
 * Author      : Giovanni Ortu
 * eMail       : giovanni.ortu@abinsula.com
 * Module name : examples
 * Description :
 */

// use :
// npm install flashair2

var flash = require('flashair2')

var flashair = new flash('flashair', 'STA')

flashair.command.getMACAddress(function (err, res) {
  if (err) {
    console.log('Error:', err)
    throw err
  }

  console.log(res)
})

