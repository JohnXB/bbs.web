import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import App from '../App';
import HomePage from '../component/index/homePage';
import Header from "../component/index/header";
import Footer from "../component/index/footer";
import AdminLayout from "../component/admin/adminLayout";
import AdminLogin from "../component/admin/adminLogin"
import NotMatch from "../component/index/notMatch"
import Register from "../component/user/register";
import Create from "../component/user/create";
import Detail from "../component/index/detail"
import UserInfo from "../component/user/userInfo"
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
                <Route exact path="/adminLogin" component={AdminLogin} onChange={setTitle("后台登录")}></Route>
                <Route  path="/admin" component={AdminLayout} onChange={setTitle("后台管理")}></Route>
                <Route component={NotMatch}/>
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
                    <Route exact path="/index" component={HomePage} onChange={setTitle("首页")}></Route>
                    <Route exact path="/articles" component={HomePage} onChange={setTitle("首页")}></Route>
                    <Route path="/article" component={Detail}
                           onChange={setTitle("")}></Route>
                    <Route path="/userInfo" component={UserInfo} onEnter={setTitle("注册")}></Route>
                    <Route path="/register" component={Register} onEnter={setTitle("注册")}></Route>
                    <Route path="/create" component={Create} onEnter={setTitle("注册")}></Route>
                    <Route component={NotMatch}/>
                </Switch>
                <Route path="/" component={Footer}></Route>
            </div>
        )
    }
}

export default BbsRouter;
