/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2020 Fábrica de Sotware IFRS. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const fs = require('fs')

module.exports = ({ stream, filename, mimetype, types = [] }) => {
  if (!types.includes(mimetype)) {
    throw new Error('Formato de imagem não permitido!')
  }

  const pathFile = `uploads/${filename}`

  return new Promise((resolve, reject) => {
    stream
      .on('open', () => {
        stream
          .pipe(fs.createWriteStream(pathFile))
          .on('error', (error) => reject(error))
          .on('finish', () => resolve({ pathFile }))
      })
      .on('error', (error) => {
        if (stream.truncated) {
          fs.unlinkSync(pathFile)
          reject(new Error('Tamanho do arquivo excedeu o limite!'))
        }
        reject(error)
      })
  })
}
