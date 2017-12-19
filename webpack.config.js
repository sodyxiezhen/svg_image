const path = require('path');
const webpack = require('webpack');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin= require('html-webpack-plugin');
const extractTextPlugin = require("extract-text-webpack-plugin");
var website ={
    publicPath:"http://localhost:6868/"
};

module.exports = {
	devtool: 'eval-source-map',
	//入口文件的配置项
    entry:{
    	entry: __dirname + '/src/main.js',
    },
    //出口文件的配置项
    output:{
    	path: __dirname + "/dist",//打包后的文件存放的地方
    	filename: 'bundle.js',
    	publicPath:website.publicPath
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module:{
    	rules: [
            // {
            //   test: /\.css$/,
            //   use: [ 'style-loader', 'css-loader' ]
            // },
            {
              test: /\.css$/,
              use: extractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
              })
            },
            {
               test:/\.(png|jpg|gif)$/ ,
               use:[{
                   loader:'url-loader',
                   options:{
                       limit:1000,
                       outputPath:'images/'
                   }
               }]
            },
            {
			    test: /\.(htm|html)$/i,
			     use:[ 'html-withimg-loader'] 
			},
            {
			    test:/\.(jsx|js)$/,
			    use:{
			        loader:'babel-loader',
			        options:{
			            presets:[
			                "es2015"
			            ]
			        }
			    },
			    exclude:/node_modules/
			}
        ],
    },
    //插件，用于生产模版和各项功能
    plugins:[
    	// new uglify(),
    	new htmlPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:'./src/index.html'
           
        }),
        new extractTextPlugin("css/index.css")
    ],
    //配置webpack开发服务功能
    devServer:{
    	//设置基本目录结构
        contentBase:path.resolve(__dirname,'dist/'),
        //服务器的IP地址，可以使用IP也可以使用localhost
        host:'localhost',
        //服务端压缩是否开启
        compress:true,
        //配置服务端口号
        port:6868,
        inline:true
    }
};