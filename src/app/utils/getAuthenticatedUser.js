/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2020 Fábrica de Sotware IFRS. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

require('dotenv').config()
const { ApolloError } = require('apollo-server-express')

const { User } = require('@models')
const jwt = require('jsonwebtoken')

const getToken = (authorization) => {
  if (!authorization) return authorization

  const parts = authorization.split(' ')
  if (parts.length !== 2) throw new Error('Token Error.')

  const [scheme, token] = parts
  if (!/^Bearer$/i.test(scheme)) throw new Error('Token Mal formatted.')

  return token
}

const getAuthenticatedUser = async (authorization) => {
  try {
    const token = getToken(authorization)

    if (!token) return null

    const { id } = await jwt.verify(token, process.env.AUTH_SECRET)

    const user = await User.findOne({ where: { id } })

    return user
  } catch (e) {
    throw new ApolloError(e.message, 'JWT')
  }
}

module.exports = { getAuthenticatedUser }
