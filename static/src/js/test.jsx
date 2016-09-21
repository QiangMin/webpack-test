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

test2.change();//调用test2.jsx里面的函数
test2.change2();//调用test2.jsx里面的函数
let x='QM';
console.log(x+' hello world');
document.write("<input type='text' />");

