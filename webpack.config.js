const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const proxyMiddleware = require('http-proxy-middleware');
const isDev = true;

// Define the Webpack config.
const config = {
  devtool: 'inline-source-map',
  watch: isDev,
  performance: {
    hints: false,
  },
  entry: {
    app: [
      './client/index.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js?[chunkhash]',
  },
  plugins: [
    // Use hoisting.
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
};

// Define development-only plugins.
if (isDev) {
  // Setup live-reloading in the browser with BrowserSync.
  config.plugins.push(new BrowserSyncPlugin({
    host: '0.0.0.0',
    port: 8000,
    server: {
      baseDir: ['./dist'],
      middleware: [
        proxyMiddleware('/primus', {
          target: 'http://127.0.0.1:7780',
          changeOrigin: false,
          ws: true
        })
      ],
    },
    open: false,
    ghostMode: false,
  }));

  // Setup the source maps.
  config.plugins.push(new webpack.SourceMapDevToolPlugin({
    filename: '[file].map',
  }));
}

module.exports = config;
