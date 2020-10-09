/*
 * MIT License
 * 
 * Copyright (c) 2020 Fábrica de Sotware IFRS
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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
