# webpack-test
### 安装和配置
#### 一.安装
我们常规直接使用 npm 的形式来安装：
    
    $ npm install webpack -g

package.json 初始化 写入依赖（webpack和插件）

    $ npm init
    $ npm install webpack --save-dev
    
安装css相关的load，css预处理器为sass
    
    $ npm install node-sass sass-loader css-loader style-loader --save-dev
    
安装babel处理器和es6转码器
    
    $ npm install babel babel-core babel-loader babel-preset-es2015 --save-dev
    
安装url处理器
    
    $ npm install url-loader --save-dev
    
安装webpack-dev-server
    
    $ npm install webpack-dev-server --save-dev

- - -
