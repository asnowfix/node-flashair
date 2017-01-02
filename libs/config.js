/**
 * Project     : flashair2
 * Component   : FileTransferService
 * Author      : Giovanni Ortu
 * eMail       : giovanni.ortu@abinsula.com
 * Module name : Config
 * Description :
 */

var Config = require('./api')

exports = module.exports = Config

Config.prototype.setString = function (mastercode, name, value, callback) {
  if (!callback) {
    throw new Error('Missing callback')
  }

  var options = {
    hostname: this.endpoint,
    pathname: '/config.cgi',
    query: {
      MASTERCODE: mastercode
    }
  }
  options.query[name] = value

  this.__request(options,
   function (err, body) {
     var res = ['']

     if (!err) { res = body.trim().split('\r\n') }

     callback(err, res[0])
   })
}

Config.prototype.setMasterCode = function (mastercode, callback) {
  if (!callback) {
    throw new Error('Missing callback')
  }

  this.__request({
    hostname: this.endpoint,
    pathname: '/config.cgi',
    query: {
      MASTERCODE: mastercode
    }
  }, function (err, body) {
    var res = ['']

    if (!err) {
      res = body.trim().split('\r\n')
    }

    callback(err, res[0])
  })
}

Config.prototype.setConnectionTimeout = function (mastercode, appautotime, appmode, callback) {
  if (!callback) {
    throw new Error('Missing callback')
  }

  this.__request({
    hostname: this.endpoint,
    pathname: '/config.cgi',
    query: {
      MASTERCODE: mastercode,
      APPAUTOTIME: appautotime,
      APPMODE: appmode
    }
  }, function (err, body) {
    var res = ['']

    if (!err) {
      res = body.trim().split('\r\n')
    }

    callback(err, res[0])
  })
}

Config.prototype.setApplicationUniqueInformation = function (mastercode, appinfo, callback) {
  this.setString(mastercode, 'APPINFO', appinfo, callback)
}

Config.prototype.setWirelessLANMode = function (mastercode, appmode, callback) {
  this.setString(mastercode, 'APPMODE', appmode, callback)
}

Config.prototype.setNetworkSecurityKey = function (mastercode, appnkey, callback) {
  this.setString(mastercode, 'APPNETWORKKEY', appnkey, callback)
}

Config.prototype.setSSID = function (mastercode, ssid, callback) {
  this.setString(mastercode, 'APPSSID', ssid, callback)
}

Config.prototype.setNetworkSecurityKeyForInternetPassthroughMode = function (mastercode, key, callback) {
  this.setString(mastercode, 'BRGNETWORKKEY', key, callback)
}

Config.prototype.setSSIDForInternetPassthroughMode = function (mastercode, ssid, callback) {
  this.setString(mastercode, 'BRGSSID', ssid, callback)
}

Config.prototype.setWirelessLanBootScreen = function (mastercode, path, callback) {
  this.setString(mastercode, 'CIPATH', path, callback)
}
