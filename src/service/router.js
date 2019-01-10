import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import App from '../App';
import Hello from '../component/homePage';

const setTitle = (title) => {
    document.title = document.title +" " + title;
    console.log(document.title)
}

class BbsRouter extends Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={App} onEnter={setTitle("首页")}></Route>
                    <Route path="/h/:id" component={Hello} ></Route>
                </div>
            </BrowserRouter>
        );
    }
}

export default BbsRouter;
