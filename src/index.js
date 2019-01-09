import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Hello from './component/homePage';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route} from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact path="/" component={App}></Route>
            <Route path="/h/:id" component={Hello}></Route>
        </div>
    </BrowserRouter>,
    document.getElementById('root'));


serviceWorker.unregister();
