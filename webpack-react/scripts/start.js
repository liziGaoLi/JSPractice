const webpack = require('webpack');
const WebpackServer = require('webpack-dev-server');
const webpackConfig = require('../config/webpack.config');
const net = require('net');
const chalk = require('chalk');
const address = require('address');

const compiler = webpack(webpackConfig({ mode: 'development' }));
// 默认端口号
let port = 8081;

function listenPort() {
  const server = net.createServer().listen(port);

  // 服务是否在监听连接，如果在监听表示端口没有被占用
  // 关闭服务，释放端口，启动webpack服务
  server.on('listening', function() {
    server.close();
    startWebpackServer();
  });

  // 服务出现错误
  server.on('error', function(err) {
    if (err.code === 'EADDRINUSE') {
      console.log(chalk.yellow(`端口：${port}，被占用，修改端口为：${++port}`));
      listenPort();
    }
  })
}

function startWebpackServer() {
  const serverConfig = Object.assign({}, webpackConfig.devServer || {}, {
    host: address.ip(),
    //启用 gzip 压缩。
    compress: true,
    //启动索引html文件,默认index.html
    index: 'factory.html',
    //是否启用热替换
    hot: true,
    //启用内联模式(inline mode)，会在控制台打印消息，用none阻止。
    clientLogLevel: 'none',
    //dev-server 的两种不同模式之间切换：true内联模式(inline mode)、 false: iframe 模式，默认true。
    inline: true,
    //自动打开浏览器
    open: true,
  });

  const webpackServer = new WebpackServer(compiler, serverConfig);
  webpackServer.listen(port);
}

listenPort();