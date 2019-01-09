import React, { Component } from 'react';
import {Button} from 'antd';
import './App.css';
import services from "./service/service"

class App extends Component {
    componentDidMount() {
        services.Bbs.GetArticle(1).then(ret => {
            console.log(ret)
        }).catch(ret => {
            console.log(ret)
        })

    };
  render() {
    return (
      <div className="App">
        <Button type="primary">hello</Button>
      </div>
    );
  }
}

export default App;
