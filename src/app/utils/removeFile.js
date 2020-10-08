const path = require('path')
const { unlink } = require('fs')

module.exports = (file) => {
  return new Promise((resolve) => {
    if (!file) resolve(false)
    const pathname = path.resolve('uploads', file)
    unlink(pathname, (e) => resolve(!e))
  })
}
