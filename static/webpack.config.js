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