const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const isPro = process.env.NODE_ENV === 'production';

const outputDir = path.join(__dirname, '../../dist/client-start');

const output = isPro ? {
  filename: '[name].js',
  path: outputDir
} : undefined;

module.exports = {
  entry: {
    main: './main.js'
  },
  mode: 'development',
  output,
  optimization: {
    minimize: isPro
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: false,
    port: 3010,
    stats: 'minimal',
    overlay: true,
    hot: true,
    inline: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'public', to: outputDir },
      ],
    }),
  ],
}