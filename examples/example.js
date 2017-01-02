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

var FlashAir = require('flashair2')

var flashair = new FlashAir('flashair', 'STA')

flashair.command.getMACAddress(function (err, res) {
  if (err) {
    console.log('Error:', err)
    throw err
  }

  console.log(res)
})
