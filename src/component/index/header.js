import React, {Component} from 'react';
import {Input, Modal, Button} from 'antd';
import services from "../../service/service"
import '../../css/index/header.css'
import logo from '../../public/logo.png'
import {Link} from 'react-router-dom'

const Search = Input.Search

class Header extends Component {
    constructor(props) {
        super()
        this.state = {
            username: "",
            password: "",
            head: "../images/logo.png",
            visible: false,
            login: "none",
            not_login: "flex"
        }
    }

    handleVisit = (e) => {

    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    setUserName = (e) => {
        this.setState({
                username: e.target.value
            }
        )
        e.target()
    }
    setPassword = (e) => {
        this.setState({
                password: e.target.value
            }
        )
    }
    handleLogout = () => {

    }

    render() {
        return (
            <div id="header">
                <div id="wrapper">
                    <div id="logo">
                        <a>
                            <img src={logo} className="logo"></img>
                            <h2>东篱</h2>
                        </a>
                    </div>
                    <div id="menu">
                        <ul>
                            <li><Link to="/index" onClick={this.handleVisit}>主页</Link></li>
                            <li><Link to="/">文章</Link></li>
                            <li><Link to="/">问答</Link></li>
                            <li><Link to="/">我的</Link></li>
                        </ul>
                    </div>
                    <div id="search">
                        <Search enterButton allowClear placeholder="请输入关键字!"/>
                    </div>
                    <div id="header_info">
                        <div id="unlogin" style={{display: this.state.not_login}}>
                            <a id="login" onClick={this.showModal}>登录</a>&nbsp;
                            <Link to='/register' id="register">注册</Link>
                        </div>
                        <div id="logged_in" className="logged_in" style={{display: this.state.login}}>
                            <img className="avatar" src={logo}/>&nbsp;
                            <span className="name">{this.state.username}</span>
                            <span className="splitor">&nbsp;|&nbsp;</span>
                            <a id="logout" className="logout" onClick={this.handleLogout}>退出</a>
                        </div>
                        <Modal
                            title="登录"
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            footer={[
                                <Button key="cancel" onClick={this.handleCancel}>取消</Button>,
                                <Button key="submit" type="primary" onClick={this.handleLogin}>
                                    登录
                                </Button>,
                            ]}
                        >
                            <div style={{marginBottom: "20px"}}>
                                <span>用户名:</span> <Input placeholder="请输入用户名" onChange={this.setUserName}
                                                         className="username" style={{width: "80%"}}/>
                            </div>
                            <div>
                                <span>密&nbsp;&nbsp;&nbsp;&nbsp;码:</span> <Input placeholder="请输入密码"
                                                                                onChange={this.setPassword}
                                                                                type="password" className="password"
                                                                                style={{width: "80%"}}/>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>

        )
    }
}

export default Header;