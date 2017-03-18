/**
 * Parse & Write the content of /SD_WLAN/CONFIG
 */

var fs = require('fs')
var path = require('path')
var ini = require('ini')
var debug = require('debug')('flashair:ini')

var volumePath = process.platform === 'darwin' ? '/Volumes/NO NAME' : undefined

var defaultConfigPath = 'SD_WLAN/CONFIG'

// https://flashair-developers.com/en/documents/api/config/#APPMODE

var appModes = {
  'AP': 4,
  'STA': 5,
  'IPT': 6
}

module.exports = IniConfig

function IniConfig (configPath) {
  configPath = configPath || path.join(volumePath, defaultConfigPath)

  this.load = function () {
    debug('loading hwConfig from "%s"', configPath)
    this._hwConfig = ini.parse(fs.readFileSync(configPath, 'utf-8'))
    debug('loaded hwConfig: %O', this._hwConfig)
  }

  this.load()

  this.save = function () {
    var iniConfig = ini.encode(this._hwConfig, {
      whitespace: false,
      newline: true,
      platform: 'win32'
    })
    debug('saving hwConfig %O as "%s"', iniConfig, configPath)
    fs.writeFileSync(configPath, iniConfig, 'utf-8')
  }
}

IniConfig.prototype.runAsAccessPoint = function _runAsAccessPoint (flashairNet) {
  debug('runAsAccessPoint: flashairNet: %s', flashairNet)
  _checkNetwork(flashairNet)
  var hwConfig = {
    Vendor: {
      APPMODE: appModes.AP,
      APPSSID: flashairNet.ssid,
      APPNETWORKKEY: flashairNet.key
    }
  }
  debug('runAsAccessPoint: Setting hw: %O', hwConfig)
  this._hwConfig.Vendor = hwConfig.Vendor
  return this
}

IniConfig.prototype.runInPassThroughMode = function _runInPassThroughMode (homeNet, flashairNet) {
  debug('runInPassThroughMode: homeNet: %O, flashairNet: %O', homeNet, flashairNet)
  _checkNetwork(flashairNet)
  _checkNetwork(homeNet)
  var hwConfig = {
    Vendor: {
      APPMODE: appModes.IPT,
      APPSSID: flashairNet.ssid,
      APPNETWORKKEY: flashairNet.key,
      BRGSSID: homeNet.ssid,
      BRGNETWORKKEY: homeNet.key
    },
    WLANSD: {
      ID: flashairNet.ssid,
      DHCP_Enabled: 'YES'
    }
  }
  debug('runInPassThroughMode: Setting hw: %O', hwConfig)
  this._hwConfig.Vendor = hwConfig.Vendor
  this._hwConfig.WLANSD = hwConfig.WLANSD
  return this
}

IniConfig.prototypesetAppMode = function _setAppMode (accessMode) {
  if (accessMode.accessPoint && accessMode.station) {
    this._hwConfig.Vendor.APPMODE = appModes.IPT
  } else if (accessMode.accessPoint && !accessMode.station) {
    this._hwConfig.Vendor.APPMODE = appModes.AP
  } else if (!accessMode.accessPoint && accessMode.station) {
    this._hwConfig.Vendor.APPMODE = appModes.STA
  } else {
    throw new Error('Invalid accessMode' + JSON.stringify(accessMode))
  }
}

IniConfig.prototype.getAppMode = function _getAppMode () {
  if (this._hwConfig.Vendor.APPMODE === appModes.IPT) {
    return {
      accessPoint: true,
      station: {
        ssid: this._hwConfig.Vendor.BRGSSID || '',
        key: this._hwConfig.Vendor.BRGNETWORKKEY || ''
      }
    }
  } else if (this._hwConfig.Vendor.APPMODE === appModes.AP) {
    return {
      accessPoint: true,
      station: false
    }
  } else if (this._hwConfig.Vendor.APPMODE === appModes.STA) {
    return {
      accessPoint: false,
      station: true
    }
  }
}

// https://flashair-developers.com/en/documents/api/config/#WLANAPMODE

IniConfig.prototype.setWlanProtocol = function _setWlanStd (wlanProtocol) {
  var WLANAPMODES = {
    '802.11b': '0x01',
    '802.11g': '0x02',
    '802.11bg': '0x03',
    '802.11ng': '0x82'
  }
  this._hwConfig.Vendor.WLANAPMODE = WLANAPMODES[wlanProtocol] || this._hwConfig.Vendor.WLANAPMODE
}

IniConfig.prototype.getWlanProtocol = function _getWlanProtocol () {
  var WLANAPMODES = {
    '0x01': '802.11b',
    '0x02': '802.11g',
    '0x03': '802.11bg',
    '0x82': '802.11ng'
  }
  return WLANAPMODES[this._hwConfig.Vendor.WLANAPMODE || '0x03']
}

function _checkNetwork (net) {
  if (typeof net.ssid !== 'string' || net.ssid.length < 1) {
    throw new Error("Invalid ssid='" + net.ssid + "' must be a string of 1+ characters")
  }
  if (typeof net.key !== 'string' || net.key.length < 8) {
    throw new Error("Invalid key='" + net.key + "' must be a string of 8+ characters")
  }
}
