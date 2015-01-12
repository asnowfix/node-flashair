/**
 * command.cgi wrapper
 * https://www.flashair-developers.com/ja/documents/api/commandcgi/
 */

var Command = require("./api");

exports = module.exports = Command;

Command.prototype.getString = function getString( code, callback ) {
    var that = this;


  this.__request({
    hostname: this.endpoint,
    pathname: "/command.cgi",
    query: {
      op: code
    },
  }, function (err, body) {
 
    var res =  body.trim().split("\r\n");
    
    callback( err, res[0] );
  });
};

Command.prototype.getInt = function( code, callback ) {
    var that = this;


  this.__request({
    hostname: this.endpoint,
    pathname: "/command.cgi",
    query: {
      op: code
    },
  }, function (err, body) {
 
    var res =  body.trim().split("\r\n");
    
    callback( err, parseInt( res[0] ) );
  });
};

Command.prototype.getFileList = function (dirname, done) {
  var that = this;

  if (dirname[0] !== "/") {
    dirname = "/" + dirname;
  }
  if (dirname.length > 1 && dirname[dirname.length - 1] === "/") {
    dirname = dirname.slice(0, -1);
  }

  var dirnameLength = dirname.length + 1;
  
  console.log( dirname )

  this.__request({
    hostname: this.endpoint,
    pathname: "/command.cgi",
    query: {
      op: 100,
      DIR: dirname
    },
  }, function (err, body) {
    
    var files = body.trim().split("\r\n");

    if (files[0] !== "WLANSD_FILELIST") {
      return done(new Error("wrong protocol"), null);
    }

    files = files.slice(1).map(function (filename) {
      var filePropArr = filename.split(","),
          prop = {};

      prop.time = Number(filePropArr.pop());
      prop.date = Number(filePropArr.pop());
      prop.attr = Number(filePropArr.pop());
      prop.size = Number(filePropArr.pop());

      // filename/dirname format
      prop.name = filePropArr.join(",").slice(dirnameLength);
      prop.path = "http://" + that.endpoint + dirname + "/" + prop.name;

      // time fortam
      var time = [];
      time[0] = prop.time >>> 11;
      // parseInt("0000011111100000", 2) => 2016
      time[1] = (2016 & prop.time) >>> 5;
      // parseInt("0000000000011111", 2) => 31
      time[2] = 31 & prop.time;
      prop.time = time;

      // date format
      var date = [];
      date[0] = (prop.date >>> 9) + 1980;
      // parseInt("0000000111100000", 2) => 480
      date[1] = (480 & prop.date) >>> 5;
      // parseInt("0000000000011111", 2) => 31
      date[2] = 31 & prop.date;
      prop.date = date;

      // attr format
      var attr = {};
      attr.archive = prop.attr >>> 5;
      // parseInt("010000", 2) => 16
      attr.directory = (16 & prop.attr) >>> 4;
      // parseInt("001000", 2) => 8
      attr.volume = (8 & prop.attr) >>> 3;
      // parseInt("000100", 2) => 4
      attr.system = (4 & prop.attr) >>> 2;
      // parseInt("000010", 2) => 2
      attr.hidden = (2 & prop.attr) >>> 1;
      // parseInt("000001", 2) => 1
      attr.readonly = 1 & prop.attr;
      prop.attr = attr;

      return prop;
    });

    done(err, files.slice(1));
  });
};

Command.prototype.getNumberOfFiles = function (dirname, done) {
  var that = this;

    if (dirname[0] !== "/") {
    dirname = "/" + dirname;
  }
  if (dirname.length > 1 && dirname[dirname.length - 1] === "/") {
    dirname = dirname.slice(0, -1);
  }

  var dirnameLength = dirname.length + 1;

  this.__request({
    hostname: this.endpoint,
    pathname: "/command.cgi",
    query: {
      op: 101,
      DIR: dirname
    },
  }, function (err, body) {
 
    var res = "";
    
    if ( !err )
     res = parseInt( body.trim().split("\r\n") );
    
    done( err, res );
  });
};

Command.prototype.getUpdateStatus = function ( done ) {
  var that = this;


  this.__request({
    hostname: this.endpoint,
    pathname: "/command.cgi",
    query: {
      op: 102
    },
  }, function (err, body) {
    
    var res = "";
 
    if ( !err )
     res =  body.trim().split("\r\n");
    
     done(parseInt(res[0]), null );
  });
};


  


Command.prototype.getSSID = function ( done ) {
  
  
  Command.prototype.getString( 102, done );

};

Command.prototype.getNetworkPassword = function ( done ) {

  Command.prototype.getString( 104, done );
  
};

Command.prototype.getMACAddress = function ( done ) {

  Command.prototype.getString( 106, done );
  
};

Command.prototype.getAcceptableBrowserLanguage = function ( done ) {

  Command.prototype.getString( 107, done );
  
};

Command.prototype.getFirmwareVersion = function ( done ) {

  Command.prototype.getString( 108, done );
  
};


Command.prototype.getControlImage = function ( done ) {

  Command.prototype.getString( 109, done );
  
};

Command.prototype.getWirelessLANMode = function ( done ) {

  Command.prototype.getInt( 110, done );
  
};


Command.prototype.getWirelessLANTimeoutPeriod = function ( done ) {

  Command.prototype.getInt( 111, done );
  
};


Command.prototype.getApplicationSpecificInformation = function ( done ) {

  Command.prototype.getString( 117, done );
  
};

Command.prototype.getUploadParameters = function ( done ) {

  Command.prototype.getInt( 118, done );
  
};

Command.prototype.getCardIdentifier = function ( done ) {

  Command.prototype.getString( 120, done );
  
};

Command.prototype.getTimestampOfWriteEvent = function ( done ) {

  Command.prototype.getInt( 121, done );
  
};


//Read data from shared memory (op=130)

//Write data to shared memory (op=131)




Command.prototype.getNumberOfEmptySectors = function ( done ) {

  Command.prototype.getString( 140, done );
  
};


//Control SD Interface as user I/O (op=190)

//Enable Photo Share mode (op=200)


//Disable Photo Share mode (op=201)

Command.prototype.getPhotoShareModeStatus = function ( done ) {

  Command.prototype.getString( 202, done );
  
};

Command.prototype.getSSIDForPhotoShareMode = function ( done ) {

  Command.prototype.getString( 203, done );
  
};

