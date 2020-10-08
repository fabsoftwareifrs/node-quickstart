const { HotModuleReplacementPlugin } = require('webpack')
const { smart } = require('webpack-merge')
const common = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = smart(common, {
  mode: 'development',
  watch: true,
  externals: [nodeExternals({ whitelist: ['webpack/hot/poll?1000'] })],
  plugins: [new CleanWebpackPlugin(), new HotModuleReplacementPlugin()],
})
