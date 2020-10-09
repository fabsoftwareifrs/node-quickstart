/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2020 Fábrica de Sotware IFRS. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const { gql } = require('apollo-server-express')

module.exports = gql`
  type AuthResponse {
    token: String!
  }

  type Query {
    hello: String
  }

  type Mutation {
    login(login: String!, password: String!): AuthResponse
  }
`
