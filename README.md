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
#### 二.配置
每个项目下都必须配置有一个webpack.config.js,它的作用如同常规的gulpfile.js/Gruntfile.js ,就是一个配置项，告诉webpack它需要做什么

我们看看下方的实例
```javascript
/**
 * Created by QM on 2016/9/21.
 */
var path=require('path');//引入路径
var webpack=require('webpack');//引入webpack
//压缩文件
var uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    },
    output: {
        comments: false,
    }
});
//使用上面的压缩文件会产生警告，解决警告
var definePlugin =  new webpack.DefinePlugin({
    "process.env": {
        NODE_ENV: JSON.stringify("production")
    }
})

module.exports={
    //页面入口文件配置
    entry:{
        'index':[
            './src/js/test.jsx'
        ],
    },
    //入口文件输出配置
    output:{
        path: __dirname,//文件的绝对路径
        publicPath: '/',//访问路径
        filename: '../dist/js/[name].min.js'//输出的文件名
    },
    module:{
        //加载器配置
        loaders:[
            {
                test:/\.scss$/,
                //loaders: ["style", "css?sourceMap", "sass?sourceMap"],
                loader:'style!css!sass?sourcemap',//这两种方式都行，一种是数组，一种是字符串，sourcemap
                include:[path.join(__dirname,'/src/css')],//只转换某个文件里面的
                exclude:/node_modules/,
            },
            {
                test:/\.jsx$/,
                //loader:'babel-loader',
                loader:'babel-loader?presets[]=es2015',//这样的话就可以不要.babelrc的配置文件
                include:[path.join(__dirname,'/src/js')],//只转换某个文件里面的
                exclude:/node_modules/,//排除某个文件的
            },
            {
                test:/\.(png|jpg)$/,
                loader:'url-loader?limit=8192'
            }
        ]

    },
    //其他解决方案配置
    resolve:{
        //自动扩展文件后缀名，意味着我们require模块和定义别名时可以省略不写后缀名
        extensions:['','.js','.jsx','.scss'],
        //绝对路径
        root: '',
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias:{
            'scss':path.resolve(//path.resolve,把当前位置转换为绝对位置
                __dirname,
                'src/css/test.scss'
            ),////后续直接 require('scss') 即可
            'js':path.resolve(
                __dirname,
                'src/js/test2'
            ),
            'jquery':path.resolve(
                __dirname,
                'src/components/jQuery/jquery.js'
            )

        }
    },
    //插件配置
    plugins: [
        uglifyJsPlugin,//压缩文件
        definePlugin,//上面压缩文件会产生警告，这个消除警告
    ],
    //devtool:'eval-source-map',//它能帮你定位到未压缩的源代码.但它会生成很大的source map文件，所以只建议在开发模式下使用
    //wathc:true//当配置了Watchmode，每当又文件修改的时候，Webpack都会自动重新build。
}
```

 
##### 1.entery
页面入口文件配置，output是对应输出项配置（即入口文件最终要生成什么名字的文件，存放到哪里），其语法大致为：
```javascript
  entry:{
        'index':[
            './src/js/test.jsx'
        ]
    },
```
entry对象的值有三种形式

1.字符串--单入口(一个文件)
    
    entry: "./entry.js",

2.数组--单入口（多个文件）
    
    entry：["./src/js/test.jsx","./src/js/test2.jsx"]

3.对象--多入口（多个文件的多个入口）
    
    entry:{
        'index':[
            './src/js/test.jsx'，
            
        ],
        "index2":[
            './src/js/test.jsx'，
            './src/js/test2.jsx'
        ]
    },
这段代码表示 
##### 2.output
是页面输入文件配置，表示入口文件最终要生成什么名字的文件，存放到哪里，
其语法大致为：
```
 output:{
        path: __dirname,//文件的绝对路径
        publicPath: '/',//访问路径
        filename: '../dist/js/[name].min.js'//输出的文件名
    },
```
当entry为单入口时,如上设置，默认生成main.min.js,可以指定filename，如

      filename: '../dist/js/build.min.js'//输出的文件名
      
最后会在dist/js生成build.js文件，在字符串模式下，build.min.js只包括一个文件，在数组模式下，build.min.js包括多个文件

当entry为多入口时，如上设置，则生成对应的文件，指定filename
    
      filename: '../dist/js/[name].min.js'//输出的文件名
    
最后会在dist/jsx下生成index.min.js和index2.min.js文件。index.min.js包括test.min.jsx文件，index2包括test.jsx和test2.jsx文件，多页面分别引入对应的js即可。
    
##### 3.module.loaders
是文件的加载器，是最关键的一块配置，它告知webpack每一种文件都需要使用什么加载器来处理：
```javascript
 module:{
        //加载器配置
        loaders:[
            {
                test:/\.scss$/,
                //loaders: ["style", "css?sourceMap", "sass?sourceMap"],
                loader:'style!css!sass?sourcemap',//这两种方式都行，一种是数组，一种是字符串，sourcemap
                include:[path.join(__dirname,'/src/css')],//只转换某个文件里面的
                exclude:/node_modules/,
            },
            {
                test:/\.jsx$/,
                //loader:'babel-loader',
                loader:'babel-loader?presets[]=es2015',//这样的话就可以不要.babelrc的配置文件
                include:[path.join(__dirname,'/src/js')],//只转换某个文件里面的
                exclude:/node_modules/,//排除某个文件的
            },
            {
                test:/\.(png|jpg)$/,
                loader:'url-loader?limit=8192'
            }
        ]

    },
```


###### lodaer也有两种模式

'-loader'其实是可以省略不写的，多个loader之间用"!"连接起来的。
1.字符串

**注意**:多个loader之间用!连接起来后面的soucemap代表可以在浏览器上映射
    
    loader:'style!css!sass?sourcemap'
等价于
    
    loader:'style-loader!css-loader!sass-loader?sourcemap'
2.数组（','分隔，注意单词后面的s）
    
    loaders: ["style", "css?sourceMap", "sass?sourceMap"]
  
###### exclude  
表示排除某个文件
###### include
表示只在这个范围里面查找
###### test
表示查找的条件，一般是正则
    
**注意** 所有的加载器都需要通过npm来记载，并建议查询他们对应的readme来看看如何使用。
你可以点[这里](http://webpack.github.io/docs/list-of-loaders.html)查询全部的loader列表。

####  4.resolve
定义了解析模块时的路径配置，这块很好理解，直接看注释
```javascript
 resolve:{
        //自动扩展文件后缀名，意味着我们require模块和定义别名时可以省略不写后缀名
        extensions:['','.js','.jsx','.scss'],
        //绝对路径
        root: '',
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias:{
            'scss':path.resolve(//path.resolve,把当前位置转换为绝对位置
                __dirname,
                'src/css/test.scss'
            ),////后续直接 require('scss') 即可
            'js':path.resolve(
                __dirname,
                'src/js/test2'
            ),
            'jquery':path.resolve(
                __dirname,
                'src/components/jQuery/jquery.js'
            )

        }
    },
```
关于webpack.config.js更详细的配置可以参考[这里](http://webpack.github.io/docs/configuration.html)

#### 5.plugins
插件项，这里我们使用了一个UglifyJsPlugin的插件，它用于压缩文件。

1.声明插件

```
//压缩文件
var uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    },
    output: {
        comments: false,
    }
});
//使用上面的压缩文件会产生警告，解决警告
var definePlugin =  new webpack.DefinePlugin({
    "process.env": {
        NODE_ENV: JSON.stringify("production")
    }
})

```
2.在plugins添加进去这两个插件
```
     plugins: [
        uglifyJsPlugin,//压缩文件
        definePlugin,//上面压缩文件会产生警告，这个消除警告
    ],
```
- - -
### 运行webpack
#### 1.执行
webpack的执行也很简单，直接执行
    
    $ webpack --dispaly-error-details

即可，后面的参数’--display-error-details‘是推荐加上的，方面出错时能够查阅更详细的信息（比如web寻找模块的过程），从而更好定位到问题。
其他主要的参数有：



#### 2.常用命令
```javascript
$ webpack //最基本的启动webpack命令

$ webpack --config XXX.js   //使用另一份配置文件（比如webpack.config2.js）来打包

$ webpack --watch   //监听变动并自动打包

$ webpack -p //压缩混淆脚本，这个非常非常重要！

$ webpack -d    //生成map映射文件，告知哪些模块被最终打包到哪里了

$ webpack --colors //输出结果带彩色，比如：会用红色显示耗时较长的步骤

$ webpack --profile //输出性能数据，可以看到每一步的耗时

$ webpack --progress  //展示进度条

$ webpack --display-error-details //这样的话方便出错的时候可以查看更详尽的信息
```
其中的-p是很重要的参数，曾经一个未压缩的的700kb的文件，压缩后直接降到180kb（主要是样式这块一句就独占一行脚本，导致未压缩脚本变得很大）。

- - -
### 模块引入
####  webpack-dev-server
提供开发服务器是非常好的一项服务，可以替换python -m SimpleHTTPServer启用HTTP静态服务器

通过以下命令全局安装
    
    $ npm install webpack-dev-server -g

启动服务器
    
    webpack-dev-server --inline  --progress --colors

这会绑定一个小型express服务器到localhost:8080，来为你的静态资源及bundle（自动编译）服务。通过访问http://localhost:8080会自动更新
#### hot module replacement
webpack-dev-server配合hot module replacement可以无刷新更新页面内容，style-loader有集合，jsx需要在代码中添加这句话(原因暂时不清楚)
```
if(module.hot){
    module.hot.accept();
}
```
配置了以上两项

可以在package.json里面配置如下
```
 "scripts": {

    "dev": "webpack-dev-server --content-base ../ --inline --hot --dispaly-error-detail"
  },
```
运行时，只需输入npm run dev 就可以运行 webpack-dev-server hot模式,