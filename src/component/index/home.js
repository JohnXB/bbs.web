import React, {Component} from 'react';
import backgroundImg1 from '../../public/ads_slider_p1.png'
import backgroundImg2 from '../../public/ads_slider_p0.png'
import "../../css/index/home.css"

class Home extends Component {
    render() {
        return (
            <div>
                <div className="bx-viewport bx-viewport-1"  style={{width:"100%", overflow: "hidden", position: "relative", height: "610px"}}>
                    <h2>免费简约的论坛系统</h2>
                    <h3>所有功能全部免费，简约好用，轻松开启在线调试</h3>
                    <img src={backgroundImg1} alt="免费简约的论坛系统"/>
                </div>
                <div className="bx-viewport bx-viewport-2"  style={{width:"100%", overflow: "hidden", position: "relative", height: "510px"}}>
                    <h2>支持MarkDown语法</h2>
                    <h3>操作简单，让作者摆脱排版的困扰，专心写作</h3>
                    <img src={backgroundImg2} alt="免费简约的论坛系统"/>
                </div>
            </div>


        );
    };
}
export default Home;