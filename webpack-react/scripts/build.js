const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config');
const chalk = require('chalk');
const ora = require('ora');

const spinner = ora('[building]').start();

const compiler = webpack(webpackConfig({ mode: 'production' }));

compiler.run(function(err, stats) {
  if (err || stats.hasErrors()) {
    console.log(chalk.red('build fail:' + stats.hasErrors()));
    return;
  }
  spinner.stop();
  console.log(chalk.green('build success'));
})