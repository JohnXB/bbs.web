import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BbsRouter from "./service/router"
import * as serviceWorker from './serviceWorker';



ReactDOM.render(
    <BbsRouter/>,
    document.getElementById('root'));
serviceWorker.unregister();
