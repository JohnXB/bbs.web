import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import App from '../App';
import Hello from '../component/index/homePage';
import Header from "../component/index/header";
import Footer from "../component/index/footer";
import AdminIndex from "../component/admin/adminIndex";
import NotMatch from "../component/index/notMatch"

const setTitle = (title) => {
    document.title = "东篱" + title;
}
class BbsRouter extends Component {


    render() {
        return (
            <BrowserRouter>
                <div>
                    {
                        window.location.pathname.startsWith("/admin") ?
                            <AdminRouter/>
                            : <UserRouter/>


                    }
                </div>
            </BrowserRouter>
        );
    }
}

class AdminRouter extends Component {
    render() {
        return (
            <Switch>
                <Route path="/admin" component={AdminIndex} onChange={setTitle("后台管理")}></Route>
            </Switch>
        )
    }
}

class UserRouter extends Component {
    render() {
        return (
            <div>
                <Route path="/" component={Header}></Route>
                <Switch>
                    <Route path='/' exact render={() => (
                        <Redirect to="/index"/>
                    )}/>
                    <Route exact path="/index" component={App} onChange={setTitle("首页")}></Route>
                    <Route exact path="/index/h/:id" component={Hello}
                           onChange={setTitle("")}></Route>
                    <Route component={NotMatch}/>
                </Switch>
                <Route path="/" component={Footer}></Route>
            </div>
        )
    }
}

export default BbsRouter;
