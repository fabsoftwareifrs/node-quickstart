let queries = {}

const modules = []

modules.forEach((module) => {
  queries = { ...queries, ...module }
})

module.exports = { ...queries }
