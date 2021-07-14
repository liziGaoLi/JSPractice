import React, { Component } from 'react';
import './index.scss';
import imgOne from './one.png';

class App extends Component {

  func = async () => {
    return new Promise(resolve => {
      setTimeout(function () {
        resolve();
      }, 500);
    }, reject => {
      console.log('reject');
      reject();
    })
  }

  async componentDidMount() {
    await this.func();
  }

  render() {
    return (
      <div className="App">
        App Component
        <div className="picture">
          图片：
          <img src={imgOne} alt=""/>
        </div>
        <div>背景图片:</div>
        <div className="back-picture"></div>
        <div>图标:</div>
        <div className="icon-box">
          <span className="icon iconfont icon-canzhuo"></span>
        </div>
      </div>
    )
  }
}

export default App;