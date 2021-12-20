const webpack = require('webpack')
const path = require('path')

function createConfig(env) {
  const webpackConfig = {
    mode: 'production',
    entry: path.resolve(__dirname, './index.ts'),
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'build'),
      libraryTarget: 'umd',
      clean: true,
    },
    resolve: {
      extensions: ['.js', '.ts'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|tsx|ts)$/,
          use: ['ts-loader'],
          exclude: '/node_modules/',
        },
      ],
    },
  }

  return webpackConfig
}

module.exports = createConfig
