const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: {
    'index': path.resolve(__dirname, "./httpdocs/js/index.js"),
  },
  output: {
    path: path.resolve(__dirname, './httpdocs/js/'),
    filename: 'index.bundle.js',
    environment: {
      arrowFunction: false
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/, 
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env',{
                  useBuiltIns: 'entry',
                  corejs: 3,
                }],
              ],
            },
          },
        ],
      },
      {
        // sassのコンパイル設定
        test: /\.(sa|sc|c)ss$/, // 対象にするファイルを指定
        use: [
          MiniCssExtractPlugin.loader, // JSとCSSを別々に出力する
          {
            loader: 'css-loader',
            options: {
              import: false,
              url: false, //URL の解決を無効に
            }
          },
          'sass-loader',
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../css/style.bundle.css'
    })
  ],
  watchOptions: {
    ignored: /node_modules/
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' webpack 1 用
    }
  }
};