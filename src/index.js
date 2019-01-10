import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Hello from './component/homePage';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route} from 'react-router-dom'

const setTitle = (title) => {
    console.log(title)
    document.title = title;
}

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact path="/" component={App} onEnter={setTitle("BBS首页")}></Route>
            <Route path="/h/:id" component={Hello} ></Route>
        </div>
    </BrowserRouter>,
    document.getElementById('root'));
serviceWorker.unregister();
