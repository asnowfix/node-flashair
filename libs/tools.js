
module.exports = {
  requestDir: function (dirname) {
    if (dirname[0] !== '/') {
      dirname = '/' + dirname
    }
    if (dirname.length > 1 && dirname[dirname.length - 1] === '/') {
      dirname = dirname.slice(0, -1)
    }

    return dirname
  },

  saveData: function (data) {
    if (typeof data !== 'string') {
      data = JSON.stringify(data)
    }
    require('fs').writeFileSync('data.log', data)
  }
}
