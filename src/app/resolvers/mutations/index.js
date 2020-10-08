let mutations = {}

const modules = [require('./auth')]

modules.forEach((module) => {
  mutations = { ...mutations, ...module }
})

module.exports = { ...mutations }
