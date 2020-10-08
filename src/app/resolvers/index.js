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
