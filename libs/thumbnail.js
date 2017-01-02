/**
 * Project     : flashair2
 * Component   : FileTransferService
 * Author      : Giovanni Ortu
 * eMail       : giovanni.ortu@abinsula.com
 * Module name : Thumbnail
 * Description :
 */

var Thumbnail = require('./api')

exports = module.exports = Thumbnail

Thumbnail.prototype.getThumbnail = function (path, callback) {
  if (!callback) {
    throw new Error('Missing callback')
  }

  this.__request({
    hostname: this.endpoint,
    pathname: '/thumbnail.cgi',
    query: {
      PATH: '?' + path
    }
  }, function (err, body) {
    callback(err, body)
  })
}
