import React, { Component } from 'react';
import {Button} from 'antd';
import './App.css';
import services from "./service/service"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Button type="primary">hello</Button>
      </div>
    );
  }
}

export default App;
