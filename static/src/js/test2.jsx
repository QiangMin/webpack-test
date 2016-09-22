/**
 * Created by Administrator on 2016/9/21.
 */
const name = 'QM';
let age = '24';
console.log('这是test2.jsx页面 dfsa sss');
var change = function () {
    console.log('这是test.jsx页面调用test2.jsx压面的change函数');
}
var change2=function(){
    console.log('这是test.jsx页面调用test2.jsx压面的change2函数');
}
module.exports = {
    change: change,
    change2:change
};