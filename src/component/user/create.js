import React from 'react'
import ReactDOM from 'react-dom'
import services from "../../service/service"
import {message, Input, Select, Button} from "antd";
import MdEditor from 'react-markdown-editor-lite'

const mock_content = ""
const Option = Select.Option;

class Create extends React.Component {
    constructor(props) {
        super()
        this.state = {
            Imgsrc: [],
            type: undefined,
            tagId: undefined,
            tags: [],
            title: ""
        }
    }

    componentDidMount() {
        if (window.localStorage.token === undefined) {
            window.location.href = "/index"
            message.error("请先登录！");
        }
        services.Bbs.GetTags().then(ret => {
            this.setState({
                tags: ret.data.data
            })
        }).catch(ret => {
            console.log(ret)
        })
    }

    handleSave = (e) => {
        if (this.state.tagId === undefined) {
            message.error("请选择标签")
        }
        if (this.state.type === undefined) {
            message.error("请选择类型")
        }
        if (this.state.title === "") {
            message.error("请输入标题")
        }
        if (this.mdEditor.getMdValue() === "") {
            message.error("请输入内容")
        }
        const SaveData = {
            type: this.state.type,
            title: this.state.title,
            tagId: this.state.tagId,
            content: this.mdEditor.getMdValue(),
            status: e
        }
        services.Bbs.CreateArticle(SaveData).then(ret => {
            if(e === 3){
                message.success("保存草稿成功，可到个人中心进行查看")
            }
           else window.location.href="/index"
        }).catch(ret => {
            message.error(ret.data.data)
        })

    }

    mdEditor = null
    setTitle = (e) => {
        this.setState({
                title: e.target.value
            }
        )
    }
    handleImageUpload = (file, callback) => {
        const reader = new FileReader()
        reader.onload = () => {
            const convertBase64UrlToBlob = (urlData) => {
                return reader.result;
            }
            const blob = convertBase64UrlToBlob(reader.result)
            // this.setState({
            //     Imgsrc:this.state.Imgsrc.push(blob)
            // })
            setTimeout(() => {
                // setTimeout 模拟oss异步上传图片
                // 当oss异步上传获取图片地址后，执行calback回调（参数为imageUrl字符串），即可将图片地址写入markdown
                callback(reader.result)
            }, 1000)
        }
        console.log(file)
        reader.readAsDataURL(file)
    }
    handleGetMdValue = () => {
        this.mdEditor && alert(this.mdEditor.getMdValue())
    }
    handleGetHtmlValue = () => {
        this.mdEditor && alert(this.mdEditor.getHtmlValue())
    }
    changeTag = (value) => {
        this.setState({
            tagId: value
        })
    }

    changeType = (value) => {
        this.setState({
            type: value
        })
    }

    render() {
        return (
            <div>
                <div style={{
                    marginTop: "20px",
                    marginBottom: "5px",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center"
                }}>
                    <Select defaultValue="请选择标签" style={{width: 120, marginLeft: 15, marginRight: 15}}
                            onChange={this.changeTag.bind(this)}>
                        {this.state.tags.map((item, i) => {
                            return (
                                <Option value={item.id} key={i}>{item.tagName}</Option>
                            )
                        })}
                    </Select>
                    <Select defaultValue="请选择类型" style={{marginRight: 20}} onChange={this.changeType.bind(this)}>
                        <Option value="1">文章</Option>
                        <Option value="2">问题</Option>
                    </Select>
                    <Input size="large" style={{marginRight: 20}} onChange={this.setTitle} placeholder="标题:一句话讲清楚"/>
                    <Button type="primary" style={{marginRight: 10}} onClick={this.handleSave.bind(this, 0)}>发布</Button>
                    <Button style={{marginRight: 20}} onClick={this.handleSave.bind(this, 3)}>保存</Button>
                </div>

                <section style={{height: "500px"}}>
                    <MdEditor
                        ref={node => this.mdEditor = node}
                        value={mock_content}
                        style={{height: '500px'}}
                        config={{
                            view: {
                                menu: true,
                                md: true,
                                html: true
                            },
                            imageUrl: 'https://octodex.github.com/images/minion.png'
                        }}
                        onImageUpload={this.handleImageUpload}
                    />
                </section>
            </div>
        )
    }
}

export default Create;