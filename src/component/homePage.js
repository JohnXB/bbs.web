import React, { Component } from 'react';
import {Button} from 'antd';
import services from "../service/service"

class Hello extends Component {
    componentDidMount() {
       console.log(this.props.match.params.id);
        services.Bbs.GetArticle(1).then(ret => {
            console.log(ret)
        }).catch(ret => {
            console.log(ret)
        })

    };
    render() {
        return (
            <div className="App">
                <Button type="primary">john</Button>

            </div>
        );
    }
}

export default Hello;
