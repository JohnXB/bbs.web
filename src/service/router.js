import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import App from '../App';
import Hello from '../component/homePage';

const setTitle = (title) => {
    console.log(title)
    document.title = title;
}

class BbsRouter extends Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={App} onEnter={setTitle("BBS首页")}></Route>
                    <Route path="/h/:id" component={Hello} ></Route>
                </div>
            </BrowserRouter>
        );
    }
}

export default BbsRouter;
