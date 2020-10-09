/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2020 Fábrica de Sotware IFRS. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const { UserInputError } = require('apollo-server-express')
const { User } = require('@models')

const login = async (_, { login, password }) => {
  const user = await User.findOne({ where: { login } })
  if (!user) throw new UserInputError('Usuário não encontrado!')

  console.log(user)
  if (!(await user.verifyPassword(password))) {
    throw new UserInputError('Senha inválida!')
  }

  user.passwordHash = undefined

  return {
    token: User.generateToken({ id: user.id }),
  }
}

module.exports = { login }
