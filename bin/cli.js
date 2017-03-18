#!/usr/bin/env node

var FlashAir = require('../lib')
var argv = require('minimist')(process.argv.slice(2))
var flashair = new FlashAir('flashair', 'IPT')
try {
  if (argv._[0] === 'config') {
    var homeNet = {
      ssid: argv['home-ssid'],
      key: argv['home-key']
    }
    var flashairNet = {
      ssid: argv['card-ssid'],
      key: argv['card-key']
    }
    flashair.ini.runInPassThroughMode(homeNet, flashairNet).save()
  } else if (argv._[0] === 'ls') {
    flashair.command.getFileList(argv._[1] || '/', function (err, data) {
      if (err) {
        console.console.error(err)
      } else {
        console.log('data:', data)
      }
    })
  } else {
    throw new Error('unknown cli command "' + argv._[0] + '"')
  }
} catch (e) {
  console.error('***', e.toString())
  process.exit(1)
}
