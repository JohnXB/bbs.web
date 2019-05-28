import React, {Component} from 'react';
import {Input, Modal, Button, Dropdown, Avatar, Menu, Icon, message, Badge,Divider} from 'antd';
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
            avatar: null,
            visible: false,
            login: "none",
            not_login: "flex",
            clickMenu: 0,
            loading: false,
            messages: []
        }
    }

    componentDidMount() {
        if (window.localStorage.token != null) {
            services.Bbs.GetUser().then(ret => {
                this.setState({
                    username: ret.data.data.username,
                    avatar: ret.data.data.avatar,
                    login: "flex",
                    not_login: "none",
                    visible: false
                })
            }).catch(ret => {
                window.localStorage.clear()
            })
            services.Bbs.GetMessages().then(ret => {
                console.log(ret.data.data)
            }).catch(ret => {

            })
            services.Bbs.GetMessages().then(ret => {
                console.log(ret.data.data.list)
                this.setState({
                    messages: ret.data.data.list
                })
            })
        }

    }

    handleVisit = (value) => {
        this.setState({
            clickMenu: value
        })
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
    }
    setPassword = (e) => {
        this.setState({
                password: e.target.value
            }
        )
    }
    handleLogout = () => {
        window.localStorage.clear();
        this.setState({
            username: "",
            password: "",
            avatar: null,
            visible: false,
            login: "none",
            not_login: "flex",
            clickMenu: -1,
            loading: false
        })
        if (window.localStorage.token === undefined) {
            window.location.href = "/index"
            return
        }
    }
    handleLogin = () => {
        //加载中按钮
        this.setState({
            loading: true
        })
        const data = {
            username: this.state.username,
            password: this.state.password
        };
        services.Bbs.Login(data).then(ret => {
            let localStorage = window.localStorage
            localStorage.token = ret.data.data.currentToken;
            this.setState({
                username: ret.data.data.username,
                avatar: ret.data.data.avatar,
                login: "flex",
                not_login: "none",
                visible: false
            })
            this.setState({
                loading: false
            })
        }).catch(ret => {
            console.log(ret)
            this.setState({
                loading: false
            })
        })
        // services.Bbs.GetMessages().then(ret => {
        //     console.log(ret.data.data.list)
        //     this.setState({
        //         messages: ret.data.data.list
        //     })
        // })

    }

    handleCreate = () => {
        if (window.localStorage.token === undefined) {
            message.error("请先登录！");
            return
        }
        else window.location.href = "/create"
    }

    render() {
        return (
            <div id="header">
                <div id="wrapper">
                    <div id="logo">
                        <Link to="/index">
                            <img src={logo} className="logo"></img>
                            <h2><Link to="/index">东篱</Link></h2>
                        </Link>
                    </div>
                    <div id="menu">
                        <ul>
                            <li><Link to="/index" onClick={this.handleVisit.bind(this, 0)}
                                      className={this.state.clickMenu === 0 ? 'on_visit' : ''}>主页</Link></li>
                            <li><Link to="/articles" onClick={this.handleVisit.bind(this, 1)}
                                      className={this.state.clickMenu === 1 ? 'on_visit' : ''}>文章</Link></li>
                            <li><Link to="/questions" onClick={this.handleVisit.bind(this, 2)}
                                      className={this.state.clickMenu === 2 ? 'on_visit' : ''}>问答</Link></li>
                            <li><Link to="/userInfo" onClick={this.handleVisit.bind(this, 3)}
                                      className={this.state.clickMenu === 3 ? 'on_visit' : ''}>我的</Link></li>
                        </ul>
                    </div>
                    <div id="action">
                        <Search enterButton allowClear placeholder="请输入关键字!"/>
                        {/*<Link to="/create" id="createArticle">*/}
                        <Button onClick={this.handleCreate} id="createArticle">
                            创建
                        </Button>
                        {/*</Link>*/}
                    </div>
                    <div id="header_info">
                        <ul id="unlogin" style={{display: this.state.not_login}}>
                            <li><a id="login" onClick={this.showModal}>登录</a></li>
                            <li><Link to='/register' id="register">注册</Link></li>
                        </ul>
                        <div id="logged_in" className="logged_in" style={{display: this.state.login}}>
                            <Dropdown trigger={['click']} overlay={
                                <Menu>
                                    <Menu.Divider></Menu.Divider>
                                    {
                                        this.state.messages.map((item, i) => {
                                            return(
                                                <Menu.Item key={i}>
                                                    {item.baUsername}{item.bacUsername}{item.bfUsername}{item.blUsername}在{item.createdAt}{item.content}"{item.title}"
                                                </Menu.Item>
                                            )
                                        })
                                    }

                                </Menu>
                            }>
                                <Badge count={this.state.messages.length}>
                                    <a href=""><Icon type="mail" style={{fontSize: '28px', color: '#9E9E9E'}}/></a>
                                </Badge>
                            </Dropdown>

                            <Dropdown overlay=
                                          {
                                              <Menu>
                                                  <Menu.Item>
                                                     {this.state.username}
                                                      <Divider style={{margin: 0}}/>
                                                  </Menu.Item>
                                                  <Menu.Item>
                                                      2nd menu item
                                                  </Menu.Item>
                                                  <Menu.Item>
                                                      <a id="logout" className="logout" onClick={this.handleLogout}
                                                         style={{color: "red"}}>退出</a>
                                                  </Menu.Item>

                                              </Menu>
                                          }>
                                <Avatar size={50} style={{
                                    backgroundColor: '#0590db',
                                    marginLeft: "20px"
                                }}>{this.state.username[0]}</Avatar>
                            </Dropdown>


                            &nbsp;
                            <span className="username">{this.state.username}</span>
                        </div>
                        <Modal
                            title="登录"
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            footer={[
                                <Button key="cancel" onClick={this.handleCancel}>取消</Button>,
                                <Button key="submit" type="primary" loading={this.state.loading}
                                        onClick={this.handleLogin}>
                                    登录
                                </Button>,
                            ]}
                        >
                            <div style={{marginBottom: "20px"}}>
                                <span>用户名:</span> <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                         placeholder="请输入用户名" onChange={this.setUserName}
                                                         className="username" style={{width: "80%"}}/>
                            </div>
                            <div>
                                <span>密&nbsp;&nbsp;&nbsp;码:</span> <Input.Password placeholder="请输入密码"
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