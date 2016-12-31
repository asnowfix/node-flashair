/**
 * Parse & Write the content of /SD_WLAN/CONFIG
 */

var fs = require('fs');
var ini = require('ini');
var debug = require('debug')('flashair:config');
var _ = require('underscore');

var _hwConfigFile = '/Volumes/NO\ NAME/SD_WLAN/CONFIG';
var _hwConfig; // hardware => private singleton

function load() {
    _hwConfig = ini.parse(fs.readFileSync(_hwConfigFile, 'utf-8'));
    _hwConfig.WLANSD = _hwConfig.WLANSD || {};
    debug("loaded hwConfig:", _hwConfig);
}

function save() {
    debug("saving hwConfig:", _hwConfig);
    var iniConfig = ini.encode(_hwConfig, {
        whitespace: false,
        newline: true,
        platform: 'win32'
    });
    debug("as:", iniConfig);
    fs.writeFileSync(_hwConfigFile, iniConfig, 'utf-8');
}

load();

// https://flashair-developers.com/en/documents/api/config/#APPMODE

var appModes = {
    "AP": 4,
    "STA": 5,
    "IPT": 6
}

module.exports = {

    save: function _save() {
        save();
        return this;
    },

    getHw: function _getHw() {
        return _.clone(_hwConfig);
    },

    setHw: function _setHw(hwConfig) {
        _hwConfig.Vendor = _.extend(_hwConfig.Vendor, hwConfig.Vendor);
        _hwConfig.WLANSD = _.extend(_hwConfig.WLANSD, hwConfig.WLANSD);
        return this;
    },

    runAsAccessPoint: function _runAsAccessPoint(flashairNet) {
        debug("runAsAccessPoint: flashairNet:", flashairNet);
        _checkNetwork(flashairNet);
        var hwConfig = {
            Vendor: {
                APPMODE: 4,
                APPSSID: flashairNet.ssid,
                APPNETWORKKEY: flashairNet.key
            }
        }
        debug("runAsAccessPoint: Setting hw:", hwConfig);
        this.setHw(hwConfig);
        return this;
    },

    runInPassThroughMode: function _runInPassThroughMode(homeNet, flashairNet) {
        debug("runInPassThroughMode: homeNet:", homeNet, "flashairNet:", flashairNet);
        _checkNetwork(flashairNet);
        _checkNetwork(homeNet);
        var hwConfig = {
            Vendor: {
                APPMODE: 6,
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
        debug("runInPassThroughMode: Setting hw:", hwConfig);
        this.setHw(hwConfig);
        return this;
    },

    get: function _get() {
        var config = {
            appMode: this.getAppMode(),
            wlanProtocol: this.getWlanProtocol()
        }
        debug("config:", config);
        return config;
    },

    setAppMode: function _setAppMode(appMode) {
        if (accessMode.accessPoint && accessMode.station) {
            _hwConfig.Vendor.APPMODE = 6; // Internet Pass-Through
        } else if (accessMode.accessPoint && !accessMode.station) {
            _hwConfig.Vendor.APPMODE = 4; // AP
        } else if (!accessMode.accessPoint && accessMode.station) {
            _hwConfig.Vendor.APPMODE = 5; // STA
        } else {
            throw new Error("Invalid appMode")
        }
    },

    getAppMode: function _getAppMode() {
        if (_hwConfig.Vendor.APPMODE = 6) {
            return {
                accessPoint: true,
                station: {
                    ssid: _hwConfig.Vendor.BRGSSID || "",
                    key: _hwConfig.Vendor.BRGNETWORKKEY || ""
                }
            }
        } else if (_hwConfig.Vendor.APPMODE = 4) {
            return {
                accessPoint: true,
                station: false
            }
        } else if (_hwConfig.Vendor.APPMODE = 5) {
            return {
                accessPoint: false,
                station: true
            }
        }
    },

    // https://flashair-developers.com/en/documents/api/config/#WLANAPMODE

    setWlanProtocol: function _setWlanStd(wlanProtocol) {
        var WLANAPMODES = {
            "802.11b": "0x01",
            "802.11g": "0x02",
            "802.11bg":"0x03",
            "802.11ng": "0x82"
        }
        _hwConfig.Vendor.WLANAPMODE = WLANAPMODES[wlanProtocol] || _hwConfig.Vendor.WLANAPMODE;
    },

    getWlanProtocol: function _getWlanProtocol() {
        var WLANAPMODES = {
            "0x01": "802.11b",
            "0x02": "802.11g",
            "0x03": "802.11bg",
            "0x82": "802.11ng"
        }
        return WLANAPMODES[_hwConfig.Vendor.WLANAPMODE || "0x03"];
    }

}

function _checkNetwork(net) {
    if(typeof net.ssid != 'string' || net.ssid.length < 1) {
        throw new Error("Invalid ssid='" + net.ssid + "' must be a string of 1+ characters");
    }
    if(typeof net.key != 'string' || net.key.length < 8) {
        throw new Error("Invalid key='" + net.key + "' must be a string of 8+ characters");
    }
}
