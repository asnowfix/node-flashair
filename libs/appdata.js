var path = require('path');
var fs = require('fs');

module.exports = function _AppData() {
    var base;

    if (process.platform === 'win32') {
        base = path.join(process.env.USERPROFILE, "AppData");
    } else {
        base = path.join(
            process.env.HOME,
            process.platform === 'darwin'
                ? "Library/Application\ Support"    // OSX/macOS
                : ".config");                       // Linux/*nix
    }

    this.appDir = function _dir(appName, next) {
        var appDir = path.join(base, appName);
        fs.lstat(appDir, function(stats) {
            if (stats.isDirectory()) {
                next();
            } else {
                fs.mkdir(appDir, next);
            }
        });
    }
}
