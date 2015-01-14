/**
 * Project     : node-flashair
 * Component   : FileTransferService
 * Author      : Giovanni Ortu
 * eMail       : giovanni.ortu@abinsula.com
 * Module name : examples
 * Description :
 */

//APPNAME, APPMODE ("STA" or "AP")
var flashair = require("./lib")("flashair", "STA");

var url = require("url"),
    http = require("http");
    
    var fs = require('fs');

    
flashair.command.getFileList( "/DCIM/101CANON" ,function (err,res) {
  if (err)
  {
    console.log( "Error:" , err );
    throw err;
  }


  console.log( res );

});

/*

flashair.command.getThumbnail("/DCIM/101CANON/IMG_2730.JPG", function (err,res) {

  if (err)
  {
    console.log( "Error:" , err );
    throw err;
  }


  fs.writeFile('a.jpg', res, 'binary', function(err){
            if (err) throw err
            console.log('File saved.')
        })
  

});

*/