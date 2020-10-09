/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2020 Fábrica de Sotware IFRS. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

let queries = {}

const modules = []

modules.forEach((module) => {
  queries = { ...queries, ...module }
})

module.exports = { ...queries }
