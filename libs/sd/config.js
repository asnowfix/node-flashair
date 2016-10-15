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
    fs.writeFileSync(_hwConfigFile, ini.encode(_hwConfig, { whitespace: false }), 'utf-8');
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
    },

    getHw: function _getHw() {
        return _.clone(_hwConfig);
    },

    setHw(hwconfig) {
        _hwConfig = _.extend(_hwConfig, hwConfig);
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
