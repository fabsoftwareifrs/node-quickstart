/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2020 Fábrica de Sotware IFRS. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

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
