const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|jpeg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: 'assets/',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
}
