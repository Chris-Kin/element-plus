/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { getPackagesSync } = require('@lerna/project')
const { VueLoaderPlugin } = require('vue-loader')
const G = require('../global.config')

const libMode = process.env.LIBMODE
const isFullMode = libMode === 'full'
let externals = [
  {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
    },
  },
]
const plugins = [
  new VueLoaderPlugin(),
]

if (!isFullMode) {
  externals.push({
    '@popperjs/core': '@popperjs/core',
    'async-validator': 'async-validator',
    'mitt': 'mitt',
    'normalize-wheel': 'normalize-wheel',
    'resize-observer-polyfill': 'resize-observer-polyfill',
  },
  /^dayjs.*/,
  /^lodash.*/)
}

const inputs = getPackagesSync()
  .map(pkg => pkg.name)
  .filter(name =>
    name.includes('@element-plus') &&
    !name.includes('transition') &&
    !name.includes('utils'),
  ).map(name => name.split('@element-plus/')[1])

console.log('all inputs:', inputs)

module.exports = inputs.map(name => ({
  mode: 'production',
  entry: path.resolve(__dirname, `../packages/${name}/index.ts`),
  output: {
    path: path.resolve(__dirname, '../single'),
    publicPath: '/',
    filename: isFullMode ? `${name}.full.js` : `${name}.js`,
    libraryTarget: 'umd',
    library: `${G.NAMESPACE}${name}`,
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'vue-loader',
          {
            loader: 'string-replace-loader',
            options: {
              search: /NAMESPACE/g,
              replace: G.NAMESPACE,
            },
          },
        ],
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'string-replace-loader',
            options: {
              search: /NAMESPACE/g,
              replace: G.NAMESPACE,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  externals,
  plugins,
}))
