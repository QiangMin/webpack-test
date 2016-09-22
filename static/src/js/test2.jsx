/**
 * Created by Administrator on 2016/8/25.
 */
/* 内容区模块代码 */
//var webpack = require('webpack');

if(module.hot) {
    // accept itself
    module.hot.accept();
}
var $=require('jquery');
var React=require('react');
var ReactDOM=require('react-dom');



var ContentMode = React.createClass({
    getInitialState: function() {
        return {liked: true};
    },
    clicj:function(){
        alert('jjkjk');
        $('.contents').html('hello ')
    },
    render: function(){
        return (
            <div className="ContentMode">
                <div className="contents" onClick={this.clicj}>{this.props.contents}</div>
                {this.props.children}
            </div>
        )
    }
});
/* 页面div封装 上面三个模块 */
var Page = React.createClass({
    getInitialState: function() {
        return {liked: false};
    },
    fun:function(){

    },
    render: function(){
        return (
            <div className="homepage">
                <ContentMode  contents ="longen">
                  hello world this is ContentMode1
                </ContentMode >
                <ContentMode  contents ="longen2">ContentMode2</ContentMode >
            </div>
        )
    }
});
console.log('this is texe.jsx')
/* 初始化到content容器内 */
ReactDOM.render(
    React.createElement(Page,null),document.getElementById("content")
);
