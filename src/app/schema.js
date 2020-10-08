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
