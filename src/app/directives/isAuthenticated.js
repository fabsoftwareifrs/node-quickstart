const {
  SchemaDirectiveVisitor,
  AuthenticationError,
} = require('apollo-server-express')
const { defaultFieldResolver } = require('graphql')

class IsAuthenticated extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = async function (...args) {
      const [, , { authenticatedUser }] = args
      console.log('directive', authenticatedUser)
      if (authenticatedUser === null) {
        throw new AuthenticationError('You are not authenticated!')
      }

      const result = await resolve.apply(this, args)

      return result
    }
  }
}

module.exports = IsAuthenticated
