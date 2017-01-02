/**
 * Project     : flashair2
 * Component   : FileTransferService
 * Author      : Giovanni Ortu
 * eMail       : giovanni.ortu@abinsula.com
 * Module name : Commands
 * Description :
 */

var Command = require('./api')

exports = module.exports = Command

function requestDir (dirname) {
  if (dirname[0] !== '/') {
    dirname = '/' + dirname
  }
  if (dirname.length > 1 && dirname[dirname.length - 1] === '/') {
    dirname = dirname.slice(0, -1)
  }

  return dirname
}

Command.prototype.getString = function getString (code, callback) {
  if (!callback) {
    throw new Error('Missing callback')
  }

  this.__request({
    hostname: this.endpoint,
    pathname: '/command.cgi',
    query: {
      op: parseInt(code)
    }
  }, function (err, body) {
    var res = ['']
    if (!err) {
      res = body.trim().split('\r\n')
    }

    callback(err, res[0])
  })
}

Command.prototype.getInt = function (code, callback) {
  if (!callback) {
    throw new Error('Missing callback')
  }

  this.__request({
    hostname: this.endpoint,
    pathname: '/command.cgi',
    query: {
      op: parseInt(code)
    }
  }, function (err, body) {
    var res = [0]

    if (!err) {
      res = body.trim().split('\r\n')
    }

    callback(err, parseInt(res[0]))
  })
}

Command.prototype.getFileList = function (dirname, callback) {
  var that = this

  if (!callback) {
    throw new Error('Missing callback')
  }

  dirname = requestDir(dirname)
  var dirnameLength = dirname.length + 1

  this.__request({
    hostname: this.endpoint,
    pathname: '/command.cgi',
    query: {
      op: 100,
      DIR: dirname
    }
  }, function (err, body) {
    var data = []

    var files = body.trim().split('\r\n')

    if (files[0] !== 'WLANSD_FILELIST') {
      return callback(new Error('wrong protocol'), null)
    }

    files = files.slice(1).map(function (filename) {
      var filePropArr = filename.split(',')
      var prop = {}

      prop.time = Number(filePropArr.pop())
      prop.date = Number(filePropArr.pop())
      prop.attr = Number(filePropArr.pop())
      prop.size = Number(filePropArr.pop())

      // filename/dirname format
      prop.name = filePropArr.join(',').slice(dirnameLength)
      prop.path = 'http://' + that.endpoint + dirname + '/' + prop.name

      // time fortam
      var time = []
      time[0] = prop.time >>> 11
      // parseInt("0000011111100000", 2) => 2016
      time[1] = (2016 & prop.time) >>> 5
      // parseInt("0000000000011111", 2) => 31
      time[2] = 31 & prop.time
      prop.time = time

      // date format
      var date = []
      date[0] = (prop.date >>> 9) + 1980
      // parseInt("0000000111100000", 2) => 480
      date[1] = (480 & prop.date) >>> 5
      // parseInt("0000000000011111", 2) => 31
      date[2] = 31 & prop.date
      prop.date = date

      // attr format
      var attr = {}
      attr.archive = prop.attr >>> 5
      // parseInt("010000", 2) => 16
      attr.directory = (16 & prop.attr) >>> 4
      // parseInt("001000", 2) => 8
      attr.volume = (8 & prop.attr) >>> 3
      // parseInt("000100", 2) => 4
      attr.system = (4 & prop.attr) >>> 2
      // parseInt("000010", 2) => 2
      attr.hidden = (2 & prop.attr) >>> 1
      // parseInt("000001", 2) => 1
      attr.readonly = 1 & prop.attr
      prop.attr = attr

      data.push(prop)
    })

    callback(err, data)
  })
}

Command.prototype.getNumberOfFiles = function (dirname, callback) {
  if (!callback) {
    throw new Error('Missing callback')
  }

  if (dirname[0] !== '/') {
    dirname = '/' + dirname
  }
  if (dirname.length > 1 && dirname[dirname.length - 1] === '/') {
    dirname = dirname.slice(0, -1)
  }

  this.__request({
    hostname: this.endpoint,
    pathname: '/command.cgi',
    query: {
      op: 101,
      DIR: dirname
    }
  }, function (err, body) {
    var res = ''

    if (!err) {
      res = parseInt(body.trim().split('\r\n'))
    }

    callback(err, res)
  })
}

Command.prototype.getUpdateStatus = function (callback) {
  if (!callback) {
    throw new Error('Missing callback')
  }

  this.__request({
    hostname: this.endpoint,
    pathname: '/command.cgi',
    query: {
      op: 102
    }
  }, function (err, body) {
    var res = [0]

    if (!err) {
      res = body.trim().split('\r\n')
    }

    callback(err, parseInt(res[0]))
  })
}

Command.prototype.getSSID = function (callback) {
  this.getString(104, callback)
}

Command.prototype.getNetworkPassword = function (callback) {
  this.getString(105, callback)
}

Command.prototype.getMACAddress = function (callback) {
  this.getString(106, callback)
}

Command.prototype.getAcceptableBrowserLanguage = function (callback) {
  this.getString(107, callback)
}

Command.prototype.getFirmwareVersion = function (callback) {
  this.getString(108, callback)
}

Command.prototype.getControlImage = function (callback) {
  this.getString(109, callback)
}

Command.prototype.getWirelessLANMode = function (callback) {
  this.getInt(110, callback)
}

Command.prototype.getWirelessLANTimeoutPeriod = function (callback) {
  this.getInt(111, callback)
}

Command.prototype.getApplicationSpecificInformation = function (callback) {
  this.getString(117, callback)
}

Command.prototype.getUploadParameters = function (callback) {
  this.getInt(118, callback)
}

Command.prototype.getCardIdentifier = function (callback) {
  this.getString(120, callback)
}

Command.prototype.getTimestampOfWriteEvent = function (callback) {
  this.getInt(121, callback)
}

// Read data from shared memory (op=130)
Command.prototype.readDataFromSharedMemory = function (addr, len, callback) {
  if (!callback) {
    throw new Error('Missing callback')
  }

  this.__request({
    hostname: this.endpoint,
    pathname: '/command.cgi',
    query: {
      op: 130,
      ADDR: addr,
      LEN: len
    }
  }, function (err, body) {
    var res = ''

    if (!err) {
      res = body.trim().split('\r\n')
    }

    callback(err, res)
  })
}

// Write data to shared memory (op=131)
Command.prototype.writeDataToSharedMemory = function (addr, len, data, callback) {
  if (!callback) {
    throw new Error('Missing callback')
  }

  this.__request({
    hostname: this.endpoint,
    pathname: '/command.cgi',
    query: {
      op: 131,
      ADDR: addr,
      LEN: len,
      DATA: data
    }
  }, function (err, body) {
    var res = ''

    if (!err) {
      res = body.trim().split('\r\n')
    }

    callback(err, res)
  })
}

Command.prototype.getNumberOfEmptySectors = function (callback) {
  this.getString(140, callback)
}

// Control SD Interface as user I/O (op=190)
Command.prototype.controlSDInterfaceAsUserIO = function (ctrl, data, callback) {
  if (!callback) {
    throw new Error('Missing callback')
  }

  this.__request({
    hostname: this.endpoint,
    pathname: '/command.cgi',
    query: {
      op: 190,
      CTRL: ctrl,
      DATA: data
    }
  }, function (err, body) {
    var res = ''

    if (!err) {
      res = body.trim().split('\r\n')
    }

    callback(err, res)
  })
}

// Enable Photo Share mode (op=200)
Command.prototype.enablePhotoShareMode = function (dirname, date, callback) {
  if (!callback) {
    throw new Error('Missing callback')
  }

  dirname = requestDir(dirname)

  this.__request({
    hostname: this.endpoint,
    pathname: '/command.cgi',
    query: {
      op: 200,
      DIR: dirname,
      DATE: date
    }
  }, function (err, body) {
    var res = ''

    if (!err) {
      res = body.trim().split('\r\n')
    }

    callback(err, res)
  })
}

// Disable Photo Share mode (op=201)
Command.prototype.disablePhotoShareMode = function (callback) {
  this.getString(201, callback)
}

Command.prototype.getPhotoShareModeStatus = function (callback) {
  this.getString(202, callback)
}

Command.prototype.getSSIDForPhotoShareMode = function (callback) {
  this.getString(203, callback)
}
