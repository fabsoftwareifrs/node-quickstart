/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2020 Fábrica de Sotware IFRS. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const path = require('path')
const { unlink } = require('fs')

module.exports = (file) => {
  return new Promise((resolve) => {
    if (!file) resolve(false)
    const pathname = path.resolve('uploads', file)
    unlink(pathname, (e) => resolve(!e))
  })
}
