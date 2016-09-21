/**
 * Created by QM on 2016/9/21.
 */
var path=require('path');//引入路径
var webpack=require('webpack');

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
//独立打包css
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports={
    //页面入口文件配置
    entry:{
        'index':[
            './src/js/test.jsx'
        ]

    },
    //入口文件输出配置
    output:{
        path: __dirname,//文件的绝对路径
        publicPath: '/',
        filename: '../dist/js/[name].min.js'
    },
    module:{
        //加载器配置
        loaders:[
            {
                test:/\.scss$/,
                //loaders: ["style", "css?sourceMap", "sass?sourceMap"],
                //loader:'style!css!sass?sourcemap',//这两种方式都行，一种是数组，一种是字符串，sourcemap
                include:[path.join(__dirname,'/src/css')],//只转换某个文件里面的
                exclude:/node_modules/,
                  loader:ExtractTextPlugin.extract('style', 'css!sass')
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
        extensions:['','.js','.jsx','.scss'],//可以不写的后缀名
        root: __dirname,
        alias:{
            'scss':path.resolve(
                __dirname,
                'src/css/test'
            ),
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
        new ExtractTextPlugin("../dist/css/[name].css")

    ],
    //devtool:'source-map',//它能帮你定位到未压缩的源代码.但它会生成很大的source map文件，所以只建议在开发模式下使用
    //wathc:true//当配置了Watchmode，每当又文件修改的时候，Webpack都会自动重新build。
}