/**
 * Created by Administrator on 2016/9/21.
 */
var path=require('path');
var webpack=require('webpack');

module.exports={
    entry:{
        'index':[
            './src/js/test.jsx'
        ]

    },
    output:{
        path: __dirname,
        publicPath: '/',
        filename: '../dist/js/[name].js'
    },
    module:{
        loaders:[
            {
                test:/\.scss$/,
                //loaders: ["style", "css?sourceMap", "sass?sourceMap"],
                loader:'style!css!sass?sourcemap',//这两种方式都行，一种是数组，一种是字符串，sourcemap
                include:[path.join(__dirname,'/src/css')],//只转换某个文件里面的
                exclude:/node_modules/,
            },
            {
                test:/\.jsx$]/,
                loader:'babel-loader',
                //loader:'babel-loader?presets[]=es2015'//这样的话就可以不要.babelrc的配置文件
                include:[path.join(__dirname,'/src/js')],//只转换某个文件里面的
                exclude:/node_modules/,//排除某个文件的
            },
            {
                test:/\.(png|jpg)$/,
                loader:'url-loader?limit=8192'
            }
        ]

    },
    resolve:{
        extensions:['','.js','.jsx','.scss'],
        alias:{
            'testScss':path.resolve(
                __dirname,
                'src/css/test.scss'
            ),
            'test2':path.resolve(
                __dirname,
                'src/js/test2.jsx'
            ),
            'jquery':path.resolve(
                __dirname,
                'src/components/jQuery/jquery.js'
            )

        }
    },
    plugins: [

    ]
    //devtool:'source-map'

}