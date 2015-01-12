/**
 * Project     : node-flashair
 * Component   : FileTransferService
 * Author      : Giovanni Ortu
 * eMail       : giovanni.ortu@abinsula.com
 * Module name : Thumbnail
 * Description :
 */

var Thumbnail = require("./api");

exports = module.exports = Thumbnail; 

Thumbnail.prototype.getThumbnail = function( path , callback) { 
  
      var that = this;
      
      if ( !callback )
      {
	throw "Missing callback";
      }      


  this.__request({
    hostname: this.endpoint,
    pathname: "/thumbnail.cgi",
    query: { PATH:path},
  }, function (err, body) {
 
    var res=[''];
    
    if (!err)
     res =  body.trim().split("\r\n");
    
     callback( err, res[0] );
  });
  
};
