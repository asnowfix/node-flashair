
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
  },

  // https://github.com/jashkenas/underscore/issues/162
  // http://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object/728694#728694
  clone: function (obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj
    }
    var copy = obj.constructor()
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = obj[attr]
      }
    }
    return copy
  },

  // http://stackoverflow.com/questions/14843815/recursive-deep-extend-assign-in-underscore-js
  extend: function (target, source) {
    for (var prop in source) {
      if (prop in target) {
        this.extend(target[prop], source[prop])
      } else {
        target[prop] = source[prop]
      }
    }
    return target
  }
}
