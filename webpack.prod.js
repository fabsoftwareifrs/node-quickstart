const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = merge(common, {
  mode: 'production',
  externals: [nodeExternals({})],
  plugins: [new CleanWebpackPlugin()],
})
