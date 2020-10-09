/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2020 Fábrica de Sotware IFRS. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

require('dotenv').config()

module.exports = {
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOSTNAME,
  dialect: 'mysql',
  logging: false,
  operatorAliases: false,
  define: {
    timestamps: true,
    underscored: true,
  },
  benchmark: true,
}
