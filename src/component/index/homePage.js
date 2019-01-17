import React, { Component } from 'react';
import {Button} from 'antd';
import {Link} from 'react-router-dom'
import services from "../../service/service"

class Hello extends Component {
    componentDidMount() {
       // console.log(this.props.match.params.id);
        console.log(window.location.pathname)
        services.Bbs.GetArticle(1).then(ret => {
            console.log(ret)
        }).catch(ret => {
            console.log(ret)
        })

    };
    render() {
        return (
            <div className="App">
                <Link to="/admin">asdasdas</Link>
            </div>
        );
    }
}

export default Hello;
