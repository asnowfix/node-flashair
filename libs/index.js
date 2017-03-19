/**
 * Project     : node-flashair
 * Component   : FileTransferService
 * Author      : Giovanni Ortu
 * eMail       : giovanni.ortu@abinsula.com
 * Module name : Library
 * Description :
 */
var debug = require('debug')('flashair:libs')

var Command = require('./command')
var Config = require('./config')
var LocalConfig = require('./local-config')
var Thumbnail = require('./thumbnail')

exports = module.exports = Libs

function Libs (endpoint, configPath) {
  try {
    // Local configuration file? config use-case
    this.config = new LocalConfig()
    debug('using local-config')
  } catch (e) {
    if (!e.code || (e.code !== 'ENOENT' && e.code !== 'ENOTDIR')) {
      // Unknown error: real one
      throw e
    } else {
      debug('using remote-ops')
      // Missing config file or config directory: run-time use-case
      this.command = new Command(endpoint)
      this.config = new Config(endpoint)
      this.thumbnail = new Thumbnail(endpoint)
    }
  }
}
