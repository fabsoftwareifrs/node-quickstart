
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2020 Fábrica de Sotware IFRS. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const mutations = require('./mutations')
const queries = require('./queries')

let others = {}
const modules = {}

Object.keys(modules).forEach((moduleName) => {
  others = { ...others, [moduleName]: modules[moduleName] }
})

module.exports = {
  ...others,
  Mutation: mutations,
  Query: queries,
}
