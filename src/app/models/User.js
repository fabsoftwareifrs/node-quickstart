/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2020 Fábrica de Sotware IFRS. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict'
require('dotenv').config()

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      login: DataTypes.STRING,
      password: DataTypes.VIRTUAL(DataTypes.STRING),
      passwordHash: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  )

  User.beforeSave(async (user) => {
    if (user.password) {
      user.passwordHash = await bcrypt.hash(user.password, 8)
    }
  })

  User.prototype.verifyPassword = function (pwd) {
    return bcrypt.compare(pwd, this.passwordHash)
  }

  User.generateToken = function ({ id, role }) {
    const SECONDS_IN_A_DAY = 24 * 60 * 60
    return jwt.sign({ id, role }, process.env.AUTH_SECRET, {
      expiresIn: SECONDS_IN_A_DAY,
    })
  }

  return User
}
