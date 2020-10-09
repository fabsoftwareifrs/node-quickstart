/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2020 Fábrica de Sotware IFRS. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('@app/schema')
const resolvers = require('@resolvers')
const directives = require('@directives')
const { getAuthenticatedUser } = require('@utils/getAuthenticatedUser')

// const sendNodeMail = require("./app/utils/sendNodeMail");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: {
    maxFileSize: 0.5 * 1024 * 1024, // 500 KB
    maxFiles: 20,
  },
  schemaDirectives: directives,
  context: async ({ req }) => {
    if (!req || !req.headers) return null

    const authorization = req.headers.authorization || ''

    const authenticatedUser = await getAuthenticatedUser(authorization)
    if (!authenticatedUser) return null

    return { authenticatedUser }
  },
  introspection: true,
  playground: process.env.NODE_ENV !== 'production',
  debug: false,
  formatError: (error) => {
    // const e = JSON.stringify(error)
    if (process.env.NODE_ENV === 'production') {
      // const mailtext = e
      if (!error.message.match(/jwt expired/)) {
        // const mailMessage = {
        //   from: 'maisbento.suporte@gmail.com',
        //   to: 'maisbento.suporte@gmail.com',
        //   subject: 'Erro!',
        //   text: mailtext
        // }
        // sendNodeMail(mailMessage);
      }
    } else {
      console.log(error)
    }
    if (
      error.message.startsWith('Database Error: ') ||
      error.extensions.code === 'INTERNAL_SERVER_ERROR' ||
      error.extensions.code === 'GRAPHQL_VALIDATION_FAILED'
    ) {
      return new Error('Ocorreu um erro interno, tente mais tarde.')
    }
    return { message: error.message }
  },
})

const app = express()
app.use(helmet())
app.use('/images', express.static(`${__dirname}/../uploads`))
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.get('/', (_, res) => {
  res.send('IFRS API')
})
server.applyMiddleware({ app })

const port = process.env.PORT || 4000

app.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
)
