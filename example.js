/**
 * Project     : node-flashair
 * Component   : FileTransferService
 * Author      : Giovanni Ortu
 * eMail       : giovanni.ortu@abinsula.com
 * Module name : examples
 * Description :
 */

//APPNAME, APPMODE ("STA" or "AP")
var flashair = require("./lib")("localhost", "STA");



flashair.command.getFileList( "/",function (err,res) {
  if (err)
  {
    console.log( "Error:" , err );
    throw err;
  }


  console.log(res);

});
