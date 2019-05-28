import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';
import services from "../../service/service"
import {message, Button, Radio, Divider} from "antd";
import "../../css/index/detail.css"

const moment1 = require('moment');
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Detail extends Component {
    constructor(props) {
        super()
        this.state = {
            content: "",
            title: "",
            username: "",
            avatar: "",
            articleId: "",
            createdAt: "",
            article: "",
            comments: [],
            sort: "created_at"
        }
    }

    componentDidMount() {
        const location = window.location.href
        services.Bbs.GetArticle({}, location.substring(location.lastIndexOf("/") + 1)).then(ret => {
            console.log(ret.data.data)
            this.setState({
                content: ret.data.data.content,
                articleId: ret.data.data.id,
                title: ret.data.data.title,
                createdAt: ret.data.data.createdAt,
                article: ret.data.data
            })
        })
        services.Bbs.GetCommentByArticleId({sort: this.state.sort}, location.substring(location.lastIndexOf("/") + 1)).then(ret => {
            console.log(ret.data.data)
            this.setState({
                comments: ret.data.data.list
            })
        })
    }

    handleSort = (e) => {
        console.log(e.target.value)
        this.setState({
            sort: e.target.value
        })
    }

    render() {
        return (
            <div style={{width: "50%", margin: "auto", display: 'flex', justifyContent: 'center', flexWrap: "wrap"}}>
                <h1 className="h1 post-topheader__info--title" id="articleTitle">
                    {this.state.title}
                </h1>
                <div style={{width: "100%", marginTop: 20}}>
                    <div className="article__authorleft">
                        <a href="/u/timao">
                            <img className="avatar-40"
                                 src="https://avatar-static.segmentfault.com/424/245/4242455849-5a449e42ae9f6_big64"/>
                        </a>
                    </div>
                    <div className="article__authorright">
                        <div className="article__authormeta">
                            <a href="/u/timao" class="mr5"><strong>Aima</strong></a>
                            <span className="hidden-xs">
                                <Button type="primary" size="small">关注作者</Button>
                                </span>
                        </div>
                        <span style={{display: "block", color: "#999", fontSize: 14}}>
                            {moment1().diff(this.state.createdAt, 'minutes') === 0 ? "刚刚" :
                                moment1().diff(this.state.createdAt, 'minutes') < 60 ? moment1().diff(this.state.createdAt, 'minutes') + "分钟前" :
                                    moment1().diff(this.state.createdAt, 'hours') < 24 ? moment1().diff(this.state.createdAt, 'hours') + "小时前" :
                                        moment1().diff(this.state.createdAt, 'days') < 7 ? moment1().diff(this.state.createdAt, 'days') + "天前" : moment1().format('YYYY-MM-DD', this.state.createdAt)}
                            发布</span>
                    </div>
                </div>


                <span style={{width: "100%", color: "#999", fontSize: 14}}> {this.state.article.viewCount} 次阅读
                    &nbsp;·&nbsp;{this.state.article.commentNum} 条评论
                    &nbsp;·&nbsp;{this.state.article.likeNum} 个点赞</span>
                <div style={{fontSize: 16, width: "100%", marginTop: 40, marginLeft: 15, marginBottom: 20}}>
                    <ReactMarkdown source={this.state.content}/>,
                </div>

                <div id="free-reward-panel" className="support-author">
                    <Button size="large" type="primary">赞 · &nbsp;{this.state.article.likeNum}</Button>
                </div>


                <div style={{width: "100%", margin: "auto", display: 'flex', justifyContent: 'space-between'}}>
                    <strong style={{fontSize: 16}}>{this.state.comments.length} 条评论</strong>
                    <RadioGroup defaultValue={this.state.sort} size="small" onChange={this.handleSort.bind(this)}>
                        <RadioButton value="created_at">时间排序</RadioButton>
                        <RadioButton value="like_num">点赞排序</RadioButton>
                    </RadioGroup>

                </div>
                <Divider style={{margin: 4}}/>
                <div className="comments-list" style={{width: "100%"}}>
                    <div className="comments-item">
                        <div className="pull-left">
                            <a href="">
                                <img className="avatar-32 "
                                     src="https://avatar-static.segmentfault.com/250/895/2508950920-5ce3d70874272_big64"/>
                            </a>
                        </div>
                        <div className="comments-content">
                            <div className="comment-trigger">
                                <div className="pull-right comment-option">
                                    <a className="hide" href="javascript:;"><span class="ml10 comment-edit-btn"><span
                                        class="glyphicon glyphicon-pencil" aria-hidden="true"></span></span>
                                    </a>
                                </div>
                                <strong><a target="_blank" href="/u/distance_5b16200ff3e30">Distance</a></strong>
                                <span className="comments-isAuthor hide"></span> <span
                                style={{color: "#999", fontSize: 14}}>  ·  4 小时前</span>
                            </div>

                            <div className="fmt mb10"><p>能加上demo就更棒了💪</p></div>

                            <p className="comment-ops" style={{color: "#999", fontSize: 14}}>
                                <span className="comments-zan ">
                                <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                                <span className="comments-zan-text">赞</span>
                                <span className="comments-zan-value"></span>
                                 </span>
                                <span className="ml15" onClick={this.Comment}>回复</span>
                            </p>

                        </div>
                    </div>
                </div>


                <div className="comments-box" id="goToReplyEditor">
                    <div className="pull-left">
                        <img className="avatar-32 "
                             src="https://avatar-static.segmentfault.com/159/228/1592282119-5ba3ac9e1fc2c_big64"
                             alt=""/>
                    </div>
                    <div className="comments-box-content">
                        {
                            window.localStorage.token === undefined ?
                                <div className="form-group mb0">
                                    请登录后评论
                                </div>
                                :
                                <div className="form-group mb0">
                                     <textarea name="text" className="form-control" placeholder="文明社会，理性评论"
                                      style={{overflow: "hidden", overflowWrap: "break-word", height: 68}}></textarea>
                                    <div class="mt15 text-right">
                                        <Button type="primary" onClick={this}>发布评论</Button>
                                    </div>
                                </div>
                        }

                    </div>
                </div>
            </div>

        )
    }
}

export default Detail;