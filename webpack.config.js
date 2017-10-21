const path = require('path')
const webpack = require('webpack')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  entry: path.join(__dirname, 'src', 'index'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [{
        test: /.jsx?$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'bower_components')
        ],
        loader: 'babel-loader',
        query: {
          presets: ['react-app']
        }
      },
      {
        test: /\.(scss|css)$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules', 'font-awesome')
        ],
        use: [{
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          },
          // {
          // loader: 'postcss-loader',
          // options: {
          // plugins: () => [
          // require('precss'),
          // require('autoprefixer')
          // ]
          // }
          // }, 
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(svg|ttf|eot|eof|woff|woff2)$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.css', '.scss', '*']
  },
  devtool: isDev ? 'cheap-module-eval-source-map' : 'source-map',
  devServer: {
    publicPath: path.join('/public/')
  },
  plugins: isDev 
    ? [
        new LiveReloadPlugin({
          appendScriptTag: true
        })
      ] 
    : []
}