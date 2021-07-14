const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');

const srcPath = path.resolve(__dirname, '../src');

module.exports = ({mode}) => {
  return {
    entry: `${srcPath}/index.js`,
    // 出口
    output: {
      path: path.resolve(__dirname, '../build'),
      filename: 'js/[name].[hash].bundle.js',
      publicPath: '/'
    },
    // webpack-server 配置
    devServer: {
      contentBase: path.join(__dirname, '../public')
    },
    // 模式， development, production
    mode: mode,
    // 生成资源映射文件
    devtool: mode === 'development' ? 'inline-source-map' : false,
    resolve: {
      // 文件扩展名
      extensions: ['.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          }
        },
        {
          test: /\.(c|sc)ss$/,
          exclude: /node_modules/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '/'
              }
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    require('postcss-preset-env')
                  ]
                }
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.(jpg|png|gif)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              name: '[name].[hash].[ext]',
              outputPath: 'image'
            }
          }
        },
        {
          test: /\.(ttf|woff|woff2)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts'
            }
          }
        }
      ]
    },
    plugins: [
      // 删除上次打包生成的文件
      new CleanWebpackPlugin(),
      // 生成html
      new HtmlWebpackPlugin({
        title: 'webpack-react',
        template: path.resolve(__dirname, '../public/factory.html'),
        filename: 'factory.html',
        inject: 'body',
        minify: false
      }),
      // 提取css到单独的文件中
      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[id].css'
      }),
      // 复制public中的静态文件
      new copyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, '../public'),
            to: path.resolve(__dirname, '../build'),
            globOptions: {
              dot: true,
              gitignore: true,
              ignore: ["**/factory.html"],
            }
          }
        ]
      })
    ]
  }
}