import React, {Component} from 'react';
import 'ant-design-pro/dist/ant-design-pro.css';
import {Exception} from 'ant-design-pro';

class NotMatch extends Component {


    render() {
        return (
            <Exception type={404} backText={"返回首页"}/>

        )
    }
}

export default NotMatch;