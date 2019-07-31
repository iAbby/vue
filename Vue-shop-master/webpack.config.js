const path = require('path');

// 启用热更新的 第2步
// const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// import img from './file.png';

module.exports = {
    entry: __dirname + "/src/main.js", // 唯一入口文件
 
    output: {
        filename: "bundle.js", // 打包后输出文件的文件名
        path: __dirname + "/dist" // 打包后的文件存放的路径
        
    },
     //devServer: { // 这是配置 dev-server 命令参数的第二种形式，相对来说，这种方式麻烦一些
    //     //  --open --port 3000 --contentBase src --hot
        //  open: true, // 自动打开浏览器
        //  port: 4000, // 设置启动时候的运行端口
        //  contentBase: 'src', // 指定托管的根目录
        //  hot: true // 启用热更新 的 第1步
      // },
    plugins:[
        //第三步
        //new webpack.HotModuleReplacementPlugin(), //new一个热更新的模块
        new htmlWebpackPlugin({
            template:path.resolve(__dirname, 'src/index.html'),//模板路径
            filename:'index.html'//自动生成的HTML文件的名称
        }),
        new VueLoaderPlugin()
    ],
    module: { // 这个节点，用于配置 所有 第三方模块 加载器 
        rules: [ // 所有第三方模块的 匹配规则      loader调用规则 从右到左 ←---
          { test: /\.css$/, use: ['style-loader', 'css-loader'] }, //  配置处理 .css 文件的第三方loader 规则
          { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, //配置处理 .less 文件的第三方 loader 规则
          { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },// 配置处理 .scss 文件的 第三方 loader 规则
           // 规则 limit给定的是图片的大小 如果我们给定图片的大小大于等于我们给定的limit 则不会被转为base64编码
           //反之会被转换name=[hash:8]-[name].[ext] 前面加hash值区分图片 名字原样输出
          { test: /\.(mp4|ogv|mpeg|webm|ogg)$/, use: 'file-loader' },
          { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=1000&name=[hash:8]-[name].[ext]' }, // 配置图片路径loader
          { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' },
          { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, // 配置 Babel 来转换高级的ES语法
          { test:/\.vue$/, use: 'vue-loader' }
        ]
      },
      resolve: {
        alias: { // 修改 Vue 被导入时候的包的路径
          // "vue$": "vue/dist/vue.js" //不选择这种导入方式，选择在main.js导入
        }
      }
};