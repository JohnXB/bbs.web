import React, {Component} from 'react';
import "../../css/user/register.css"
import {Radio, message, Input, Button} from 'antd';
import services from "../../service/service"
import Particles from 'reactparticles.js';
import {Redirect} from 'react-router-dom'
const RadioGroup = Radio.Group;
const mailReg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
const phoneReg = new RegExp("^[1][3,4,5,7,8][0-9]{9}$")
const usernameReg = new RegExp("^[a-zA-Z0-9_]{2,16}$")

class Register extends Component {
    constructor(props) {
        super()
        this.state = {
            username: "",
            password: "",
            gender: "",
            email: "",
            phone: "",
            //检查条件
            checkPass: false,
            checkUsername: false,
            checkPhone: false,
            checkMail: false,
            checkNewPass: false,
            confirmPass: false,
            loading: false,
            //错误提示
            errorUsername: "",
            errorPass: "",
            errorPhone: "",
            errorMail: "",
            errorNewPass: "",
        }
    }

    handleSignUp = () => {

        if (!this.state.confirmPass) {
            message.error("请保持2次密码一致");
            return
        }
        if (this.state.checkPass || this.state.checkPass || this.state.checkNewPass || this.state.checkMail || this.state.checkPhone) {
            message.error("请输入正确用户信息！")
            return
        }
        else if (this.state.username === "" || this.state.password === "" || this.state.message === "" || this.state.phone === "") {
            message.error("请输入用户信息！")
            return
        }
        const data = {
            name: this.state.name,
            username: this.state.username,
            mail: this.state.email,
            password: this.state.password,
            gender: this.state.gender,
            phone: this.state.phone
        };
        this.setState({
            loading: true
        })


        services.Bbs.Register(data).then(ret => {
            let data = ret.data
            this.setState({
                loading: false
            })
            message.success(data.message);
            this.props.history.push("/index")
        }).catch(ret => {
            console.log(ret)
            this.setState({
                loading: false
            })
        })

    }
    setUserName = (e) => {
        let _username = e.target.value
        this.setState({
            username: e.target.value
        })
        if (_username.length === 0) {
            this.setState({
                errorUsername: "用户名不能为空",
                checkUsername: true
            })
            return
        }
        if (!usernameReg.test(_username)) {
            this.setState({
                errorUsername: "用户名只能2-15位的字母,数字,下划线组成",
                checkUsername: true
            })
        }
        else this.setState({
            checkUsername: false
        })
    }
    setMail = (e) => {
        let _mail = e.target.value
        this.setState({
                email: _mail
            }
        )
        if (_mail.length === 0) {
            this.setState({
                errorMail: "邮箱不能为空",
                checkMail: true
            })
        }
        else if (!mailReg.test(_mail)) {
            this.setState({
                errorMail: "邮箱格式不正确",
                checkMail: true
            })
        }
        else this.setState({
                checkMail: false
            })

    }
    setPhone = (e) => {
        let _phone = e.target.value
        this.setState({
                phone: _phone
            }
        )
        if (_phone.length === 0) {
            this.setState({
                errorPhone: "手机号不能为空",
                checkPhone: true
            })
        }
        else if (!phoneReg.test(_phone)) {
            this.setState({
                errorPhone: "手机号格式不正确",
                checkPhone: true
            })
        }
        else this.setState({
                checkPhone: false
            })
    }
    setGender = (e) => {
        this.setState({
                gender: e.target.value
            }
        )
    }
    setPassword = (e) => {
        let _pass = e.target.value
        this.setState({
                password: _pass
            }
        )
        if (_pass.length === 0) {
            this.setState({
                errorPass: "密码不能为空",
                checkPass: true
            })
            return
        }
        else if (_pass.length < 6) {
            this.setState({
                errorPass: "密码不能小于6位",
                checkPass: true
            })
            return
        }
        if (_pass.length > 16) {
            this.setState({
                errorPass: "密码不能大于16位",
                checkPass: true
            })
            return
        }
        else this.setState({
            checkPass: false
        })
    }
    checkPassword = (e) => {
        let newPass = e.target.value
        if (newPass === "") {
            this.setState({
                errorNewPass: "请确认密码",
                checkNewPass: true
            })

        }
        else if (newPass != this.state.password) {
            this.setState({
                errorNewPass: "请保持2次密码一致",
                checkNewPass: true
            })
        }
        else this.setState({
                    confirmPass: true,
                    checkNewPass: false
                }
            )

    }

    render() {
        return (
            <div>

                <div className="register"
                     style={{width: "100%", overflow: "hidden", position: "relative"}}>

                    <div className="form_list">
                        <div className="active signin">东篱网注册</div>
                        <input type="hidden" name="_xsrf"/>
                        <Particles id="test-particles" config="my-particles.json"/>
                        <ul>
                            <li>
                                <label className="input_label">用户名:</label>
                                <Input type="text" name="username" onChange={this.setUserName}
                                       onBlur={this.setUserName}/>
                                <span>
                                 <span
                                     className={this.state.checkUsername ? "" : "error_info"}>{this.state.errorUsername}</span>
                                </span>
                            </li>
                            <li>
                                <label className="input_label">邮箱:</label>
                                <Input type="text" name="mail" onChange={this.setMail} onBlur={this.setMail}/>
                                <span>
                                 <span
                                     className={this.state.checkMail ? "" : "error_info"}>{this.state.errorMail}</span>
                                </span>
                            </li>
                            <li>
                                <label className="input_label">电话:</label>
                                <Input type="text" name="phone" onChange={this.setPhone} onBlur={this.setPhone}/>
                                <span>
                                 <span
                                     className={this.state.checkPhone ? "" : "error_info"}>{this.state.errorPhone}</span>
                                </span>
                            </li>
                            <li>
                                <label className="input_label">性别:</label>
                                <RadioGroup onChange={this.setGender} defaultValue="true">
                                    <Radio value="true">男</Radio>
                                    <Radio value="false">女</Radio>
                                </RadioGroup>
                                <span>
                                 <span></span>
                            </span>
                            </li>
                            <li>
                                <label className="input_label">密码:</label>
                                <Input type="password" name="password" onChange={this.setPassword}
                                       onBlur={this.setPassword}/>
                                <span>
                                 <span
                                     className={this.state.checkPass ? "" : "error_info"}>{this.state.errorPass}</span>
                            </span>
                            </li>
                            <li>
                                <label className="input_label">确认密码:</label>
                                <Input type="password" onChange={this.checkPassword} onBlur={this.checkPassword}/>
                                <span>
                                 <span
                                     className={this.state.checkNewPass ? "" : "error_info"}>{this.state.errorNewPass}</span>
                            </span>
                            </li>
                        </ul>
                        <div className="registerBtn">
                            <Button className="bt_css" type="primary" loading={this.state.loading}
                                    onClick={this.handleSignUp}>
                                立即注册
                            </Button>
                        </div>


                    </div>
                </div>
            </div>
        );
    };
}

export default Register;

