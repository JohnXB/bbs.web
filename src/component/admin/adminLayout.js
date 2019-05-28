import React, {Component} from 'react';
import {Layout, Menu, Breadcrumb, Icon,Avatar,Table,Button} from 'antd';
import MyFooter from "../index/footer";
import logo from '../../public/logo.png'
import AdminIndex from "../admin/adminIndex";
import AdminLogin from "../admin/adminLogin"
import { Link,Route, Switch} from 'react-router-dom'
import NotMatch from "../index/notMatch"
import "../../css/admin/adminLayout.css"

const {
    Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;
const columns = [
    {
        title: '标题',
        dataIndex: 'name',
        filters: [
            {
                text: 'Joe',
                value: 'Joe',
            },
            {
                text: 'Jim',
                value: 'Jim',
            },
            {
                text: 'Submenu',
                value: 'Submenu',
                children: [
                    {
                        text: 'Green',
                        value: 'Green',
                    },
                    {
                        text: 'Black',
                        value: 'Black',
                    },
                ],
            },
        ],
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
    },
    {
        title: '作者',
        dataIndex: 'age',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.age - b.age,
    },
    {
        title: '时间',
        dataIndex: 'address',
        filters: [
            {
                text: 'London',
                value: 'London',
            },
            {
                text: 'New York',
                value: 'New York',
            },
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.address.indexOf(value) === 0,
        sorter: (a, b) => a.address.length - b.address.length,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: '所属标签',
        dataIndex: 'add',
        filters: [
            {
                text: 'London',
                value: 'London',
            },
            {
                text: 'New York',
                value: 'New York',
            },
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.address.indexOf(value) === 0,
        sorter: (a, b) => a.address.length - b.address.length,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: '操作',
        dataIndex: 'op',
        filters: [
            {
                text: 'London',
                value: 'London',
            },
            {
                text: 'New York',
                value: 'New York',
            },
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.address.indexOf(value) === 0,
        sorter: (a, b) => a.address.length - b.address.length,
        sortDirections: ['descend', 'ascend'],
    },
];

const data = [
    {
        key: '1',
        name: '简单梳理Redux的源码与运行机制',
        age:  'john',
        address: '2019-5-5 12:25:33',
        add:'前端',
        op:<Button>查看</Button>
    },
    {
        key: '2',
        name: 'JavaScript数据结构与算法-Array-',
        age: 'john',
        address: '2019-5-5 12:25:33',
         add:'前端',
        op:<Button>查看</Button>
    },
    {
        key: '3',
        name: 'MySQL8.0 - 新特性 - 安全及权限相关改进',
        age: 'john',
        address: '2019-5-5 12:25:33',
        add:'前端',
        op:<Button>查看</Button>
    },
    {
        key: '4',
        name:  'react进阶之路',
        age: 'john',
        address: '2019-5-5 12:25:33',
        add:'前端',
        op:<Button>查看</Button>

    },
];

function onChange(pagination, filters, sorter) {
    console.log('params', pagination, filters, sorter);
}
class SiderDemo extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}
                >
                    <div className="logo">东篱</div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Icon type="book" />
                            <span>文章管理</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="share-alt" />
                            <span>推荐管理</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="tag"/>
                            <span>标签管理</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{display:"flex",justifyContent:"space-between",alignItems:"center",background: '#fff', padding: 0}}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <div>
                            <Avatar size="" icon="user" />
                            <span style={{fontSize:"13px",marginLeft:"5px"}}>管理员</span>
                            <Icon type="logout" style={{marginLeft:"5px",marginRight:"20px", fontSize: '14px'}}/>
                        </div>
                    </Header>
                    <Content style={{margin: '0 16px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>文章审核</Breadcrumb.Item>
                            {/*<Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
                        </Breadcrumb>
                        <div style={{padding: 24, background: '#fff'}}>
                            <Table columns={columns} dataSource={data} onChange={onChange} />
                        </div>
                    </Content>
                        <MyFooter/>
                </Layout>
            </Layout>
        );
    }
}

export default SiderDemo;
