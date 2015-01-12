var Config = require("./api");

exports = module.exports = Config; 

Config.prototype.setString = function(mastercode, name,value, callback) {
  
      var that = this;
      
      if ( !callback )
      {
	throw "Missing callback";
      }      

var json = '{\
    hostname: '+this.endpoint+',\
    pathname: "/config.cgi",\
    query: {\
      MASTERCODE : '+ mastercode +',\
      ' + name + ' : ' + value +'\
    }';      
      
  this.__request(JSON.parse(json),
   function (err, body) {
 
    var res=[''];
    
    if (!err)
     res =  body.trim().split("\r\n");
    
    callback( err, res[0] );
  });
  
};

Config.prototype.setMasterCode = function(mastercode, callback) {
  
      var that = this;
      
      if ( !callback )
      {
	throw "Missing callback";
      }      


  this.__request({
    hostname: this.endpoint,
    pathname: "/config.cgi",
    query: {
      MASTERCODE: mastercode
    },
  }, function (err, body) {
 
    var res=[''];
    
    if (!err)
     res =  body.trim().split("\r\n");
    
     callback( err, res[0] );
  });
  
};

Config.prototype.setConnectionTimeout = function( mastercode, appautotime,appmode, callback) {
  
      var that = this;
      
      if ( !callback )
      {
	throw "Missing callback";
      }      

     
  this.__request({
    hostname: this.endpoint,
    pathname: "/config.cgi",
    query: {
      MASTERCODE: mastercode,
      APPAUTOTIME: appautotime,
      APPMODE: appmode
    },
  }, function (err, body) {
 
    var res=[''];
    
    if (!err)
     res =  body.trim().split("\r\n");
    
     callback( err, res[0] );
  });
  
};

Config.prototype.setApplicationUniqueInformation = function(mastercode, appinfo, callback) {
      
      Config.prototype.setString( mastercode,"APPINFO", appinfo, callback );
  
};

Config.prototype.setWirelessLANMode = function(mastercode, appmode, callback) {
  
      Config.prototype.setString( mastercode,"APPMODE", appmode, callback );
  
};

Config.prototype.setNetworkSecurityKey = function(mastercode, appnkey, callback) {
  
      Config.prototype.setString( mastercode,"APPNETWORKKEY", appnkey, callback );
  
};

Config.prototype.setSSID = function(mastercode, ssid, callback) {
  
      Config.prototype.setString( mastercode,"APPSSID", ssid, callback );
  
};


Config.prototype.setNetworkSecurityKeyForInternetPassthroughMode = function(mastercode, key, callback) {
  
      Config.prototype.setString( mastercode,"BRGNETWORKKEY", key, callback );
  
};

Config.prototype.setSSIDForInternetPassthroughMode = function(mastercode, ssid, callback) {
  
      Config.prototype.setString( mastercode,"BRGSSID", ssid, callback );
  
};

Config.prototype.setWirelessLanBootScreen = function(mastercode, path, callback) {
  
      Config.prototype.setString( mastercode,"CIPATH", path, callback );
  
};

