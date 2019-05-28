import React, {Component} from 'react';
import {Button, Divider, Icon, Pagination, Carousel} from 'antd';
import {Link} from 'react-router-dom'
import ReactMarkdown from 'react-markdown';
import services from "../../service/service"
import "../../css/index/homePage.css"

var moment = require('moment');

class HomePage extends Component {
    constructor(props) {
        super()
        this.state = {
            articleType: 0,
            type: 1,//默认为1时间
            tags: [],
            page: 1,
            pageSize: 20,
            articles: [],
            total: 0,
            tagId: 0,
            tagName: "所有"
        }
    }

    componentDidMount() {
        // console.log(this.props.match.params.id);
        // console.log(window.location.pathname)
        services.Bbs.GetTags().then(ret => {
            this.setState({
                tags: ret.data.data
            })
        }).catch(ret => {
            console.log(ret)
        })
        const ArticleData = {}
        services.Bbs.GetArticles(ArticleData, this.state.tagId).then(ret => {
            // console.log(ret.data.data)
            this.setState({
                articles: ret.data.data.list,
                page: ret.data.data.page,
                total: ret.data.data.total
            })
        })
    };

    changeShowType = (value) => {
        this.setState({
            type: value
        })
        const ArticleData = {
            type: value,
            articleType: this.state.articleType,
            pageSize: this.state.pageSize
        }
        services.Bbs.GetArticles(ArticleData, this.state.tagId).then(ret => {
            this.setState({
                articles: ret.data.data.list,
                page: ret.data.data.page,
                total: ret.data.data.total
            })
        })
    }
    changeTag = (value, tagName) => {
        this.setState({
            tagId: value,
            tagName: tagName
        })
        const ArticleData = {
            type: this.state.type,
            articleType: this.state.articleType,
            pageSize: this.state.pageSize
        }
        services.Bbs.GetArticles(ArticleData, value).then(ret => {
            this.setState({
                articles: ret.data.data.list,
                page: ret.data.data.page,
                total: ret.data.data.total
            })
        })
    }

    render() {
        return (
            <div className="content">
                <div className="content_left">
                    <div className="router-box">
                        <a className={this.state.type === 1 ? 'router-box-item item-active' : 'router-box-item'}
                           onClick={this.changeShowType.bind(this, 1)}>
                            <Icon type="link"/>
                            <span>&nbsp;最新内容</span>
                        </a>
                        <a className={this.state.type === 2 ? 'router-box-item item-active' : 'router-box-item'}
                           onClick={this.changeShowType.bind(this, 2)}>
                            <Icon className="tag_icon" type="tag"/>
                            <span>&nbsp;为你推荐</span>
                        </a>
                        <a className={this.state.type === 3 ? 'router-box-item item-active' : 'router-box-item'}
                           onClick={this.changeShowType.bind(this, 3)}>
                            <Icon type="like"/>
                            <span>&nbsp;近期热门</span>
                        </a>

                    </div>
                    <Divider orientation="left">技术频道</Divider>
                    {
                        this.state.tags.map((item, i) => {
                            return (
                                <a className={this.state.tagId === item.id ? 'tag_item item-active' : 'tag_item'}
                                   key={i} onClick={this.changeTag.bind(this, item.id, item.tagName)}>
                                <span className="tag_icon">
                                     <img src={"data:image/png;base64," + item.icon}/>
                                </span>
                                    <span>{item.tagName}</span>
                                </a>
                            )

                        })
                    }
                </div>
                <div className="content_middle">
                    <Carousel autoplay>
                        <div className="bx-viewport bx-viewport-1">
                            <h2>免费简约的论坛系统</h2>
                            <h3>所有功能全部免费，简约好用，轻松开启在线调试</h3>
                        </div>
                        <div className="bx-viewport bx-viewport-2">
                            <h2>支持MarkDown语法</h2>
                            <h3>操作简单，让作者摆脱排版的困扰，专心写作</h3>
                        </div>
                    </Carousel>
                    <span style={{paddingTop: 10, fontSize: 15}}>{this.state.tagName}</span>
                    <Divider type="vertical"/>
                    <span style={{
                        paddingTop: 10,
                        fontSize: 15
                    }}>{this.state.type === 1 ? "最新" : this.state.type === 2 ? "推荐" : "热门"}</span>
                    <Divider style={{margin: 4}}/>
                    <div style={{minHeight: "500px"}}>
                        {
                            this.state.articles.map((item, i) => {
                                return (
                                    <div className="article">
                                        {
                                            item.content.indexOf("![](") >= 0 ? item.content.substring(item.content.indexOf("![](") + 4, item.content.indexOf("==)")) !== "" ?
                                                <img className="news-img"
                                                     src={item.content.substring(item.content.indexOf("![](") + 4, item.content.indexOf("==)"))}></img> : "" : ""
                                        }
                                        <a href={"/article/"+ item.id}>
                                            <div className="article_title">
                                                <h4 className="article_title_h">{item.title}</h4></div>
                                            <div className="article_excerpt">
                                                <div>
                                                    {item.content}
                                                </div>
                                                {/*<ReactMarkdown source={item.content} style={{fontSize:10}}/>*/}
                                            </div>
                                        </a>
                                        <div className="article_info">
                                <span className="votes-operation " data-type="article">
                                    <Icon type="like" style={{fontSize: '16px', color: '#9E9E9E'}} theme="twoTone"/>
                                    <span className="dot ">·</span>
                                    <span className="votes-num" style={{paddingRight: "30px "}}>{item.likeNum}&nbsp;
                                        赞</span>

                                    <Icon type="message"/>
                                    <span className="dot ">·</span>
                                    <span className="votes-num" style={{paddingRight: "30px"}}>{item.commentNum}</span>

                                    <Icon type="eye"/>
                                     <span className="dot ">·</span>
                                    <span className="votes-num" style={{paddingRight: "30px;"}}>{item.viewCount}</span>
                                </span>

                                            <span className="author">
                                    <a href="/u/idisfkj">{item.username}</a>
                                    <span className="dot">·</span>
                                                {moment().diff(item.updatedAt, 'minutes') === 0 ? "刚刚" :
                                                    moment().diff(item.updatedAt, 'minutes') < 60 ? moment().diff(item.updatedAt, 'minutes') + "分钟前" :
                                                        moment().diff(item.updatedAt, 'hours') < 24 ? moment().diff(item.updatedAt, 'hours') + "小时前" :
                                                            moment().diff(item.updatedAt, 'days') < 7 ? moment().diff(item.updatedAt, 'days') + "天前" : moment().format('YYYY-MM-DD', item.updatedAt)
                                                }
                                </span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <Pagination defaultCurrent={1} defaultPageSize={20}
                                pageSize={this.state.pageSize} total={this.state.total}  hideOnSinglePage={true}/>
                </div>
                <div className="content_right"></div>
            </div>
        );
    }
}

export default HomePage;
