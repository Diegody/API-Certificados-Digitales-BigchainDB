const path = require('path');

module.exports = {
  mode: 'development',
  entry: './JS/assets.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      // Define un alias para bs58
      bs58: path.resolve(__dirname, 'node_modules/bs58'),
    },
  },
};
