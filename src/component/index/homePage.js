import React, {Component} from 'react';
import {Button} from 'antd';
import {Link} from 'react-router-dom'
import services from "../../service/service"

class HomePage extends Component {
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
            <div className="content">
                <div className="content_left"></div>
                <div className="content_middle"></div>
                <div className="content_right"></div>
            </div>
        );
    }
}

export default HomePage;
