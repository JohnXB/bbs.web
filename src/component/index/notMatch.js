import React, {Component} from 'react';
import {Button} from 'antd';
import services from "../../service/service"

class NotMatch extends Component{
    render() {
        return (
            <div>
                <Button type="primary">找不到该页面</Button>
            </div>

        )
    }
}
export default NotMatch;