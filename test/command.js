/* eslint-env mocha */
/**
 * command.js test
 *
 */

var expect = require('chai').expect
var FlashAir = require('../lib')

var flashair = new FlashAir('flashair', 'STA')

describe('flashair.command', function () {
  describe('.getFileList', function () {
    it('should find top-level DCIM and GUPIXINF folders', function (done) {
      flashair.command.getFileList('/', function (err, data) {
        expect(err).to.be.not.ok
        expect(data).to.be.an('array')

        expect(data[0]).to.be.an('object')
        expect(data[0].name).to.equal('DCIM')
        expect(data[0].attr).to.be.an('object')
        expect(data[0].attr.directory).to.equal(1)

        expect(data[1]).to.be.an('object')
        expect(data[1].name).to.equal('GUPIXINF')
        expect(data[1].attr).to.be.an('object')
        expect(data[1].attr.directory).to.equal(1)

        done()
      })
    })
  })
})
