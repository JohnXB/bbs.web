import React, {Component} from 'react';
import {Icon} from 'antd'
import '../../css/user/userInfo.css'
class UserInfo extends Component {
    state = {
        userInfo: {},
        menus: [],
        active: 0
    }
    componentWillMount (){
        const userInfo_ = {
            id: '1213213',
            pic: 'https://avatar-static.segmentfault.com/126/327/1263277008-5ad36b3f8f253_huge256',
            name: 'winer',
            prestige: 126,
            base: '重庆',
            school: '重庆理工大学',
            major: '软件工程',
            company: '海康威视',
            job: '前端开发',
            personPortal: 'www.baidu.com',
            follow: 6,
            fans: 5,
            answer: 2,
            question: 2,
            article: 3,
            lecture: 3,
            note: 0,
            share: 1,
            favorites: 1
        }
        this.setState({
            userInfo: userInfo_,
            menus: [
                {
                    name: '我的主页',
                    num: 0,
                },
                {
                    name: '我的回答',
                    num: userInfo_.answer,
                },
                {
                    name: '我的提问',
                    num: userInfo_.question,
                },
                {
                    name: '我的文章',
                    num: userInfo_.article,
                },
                {
                    name: '我的讲座',
                    num: userInfo_.lecture,
                },
                {
                    name: '我的笔记',
                    num: userInfo_.note,
                },
                {
                    name: '我的分享',
                    num: userInfo_.share,
                },
                {
                    name: '我的收藏夹',
                    num: userInfo_.favorites,
                }
            ]
        })
    }
    muenItemClick = (item, index) => {
        this.setState({
            active: index
        })
        console.log(item)
    }
    render() {
        const {userInfo, menus, active} = this.state
        return (
            // <div type={404} backText={"返回首页"}/>
            <div className='profile'>
                <div className='profile__heading'>
                    <div className='container'>
                        <div className='header-pic'>
                            <img src={userInfo.pic} alt='头像'/>
                        </div>
                        <div className='header-info'>
                            <h2>{userInfo.name}</h2>
                            <div className='prestige'>{userInfo.prestige} <span style={{color: '#777'}}>声望</span></div>
                            <div className='userInfo'>
                                <div>
                                    <Icon type="home" style={{color: '#777'}}/>
                                    <span> {userInfo.base} </span>
                                    <Icon type="edit" style={{color: '#777', cursor: 'pointer'}}/>
                                </div>
                                <div>
                                    <Icon type="project" style={{color: '#777'}}/>
                                    <span> {userInfo.school} | {userInfo.major} </span>
                                    <Icon type="edit" style={{color: '#777', cursor: 'pointer'}}/>
                                </div>
                                <div>
                                    <Icon type="shopping" style={{color: '#777'}}/>
                                    <span> {userInfo.company} | {userInfo.job} </span>
                                    <Icon type="edit" style={{color: '#777', cursor: 'pointer'}}/>
                                </div>
                                <div>
                                    <Icon type="api" style={{color: '#777'}}/>
                                    <span> {userInfo.personPortal} </span>
                                    <Icon type="edit" style={{color: '#777', cursor: 'pointer'}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='menu-container'>
                    <div className='menu'>
                        <div className='menu-header'>
                            <div>
                                <p>关注了</p>
                                <p>{userInfo.follow} 人</p>
                            </div>
                            <div>
                                <p>粉丝</p>
                                <p>{userInfo.fans} 人</p>
                            </div>
                        </div>
                        <div className='menu-body'>
                            {
                                menus.map((e, index) => {
                                    if (e.num && e.num !== 0) {
                                        if (index === active) {
                                            return (<div key={index} className='menuItem item-active' onClick={event => this.muenItemClick(e, index)}>
                                                <span>{e.name}</span>
                                                <span>{e.num}</span>
                                            </div>)
                                        } else {
                                            return (<div key={index} className='menuItem' onClick={event => this.muenItemClick(e, index)}>
                                                <span>{e.name}</span>
                                                <span>{e.num}</span>
                                            </div>)
                                        }
                                    } else {
                                        if (index === active) {
                                            return (<div key={index} className='menuItem item-active' onClick={event => this.muenItemClick(e, index)}>
                                                <span>{e.name}</span>
                                            </div>)
                                        } else {
                                            return (<div key={index} className='menuItem' onClick={event => this.muenItemClick(e, index)}>
                                                <span>{e.name}</span>
                                            </div>)
                                        }
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserInfo;