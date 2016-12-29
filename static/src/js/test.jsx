//hot module repalce   
if(module.hot){
    module.hot.accept();
}

require('scss');//
var test2=require('js');
var $=require('jquery');


$(function(){
    console.log('这是test.jsx页面的ready函数 ddd')
})

let x='QM';
console.log(x+' hello world');

