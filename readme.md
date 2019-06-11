gulp grunt webpack
webpack 基础篇
npm 卸载包
npm uninstall 包名 npm unistall webpack -g -global 全局表示哪都能用

初始化项目
yarn init -y ||npm init -y
webpack 安装
webpack4.0
安装本地的 webpack
yarn add webpack webpack-cli -D||npm install webpack webpack-cli -D
-D 表示 development 开发环境
webpack 可以进行 0 配置
目录结构

src
index.js
直接运行 npx webpack
打包工具 -> 输出后的结果(js 模块)
打包（直接 js 的模块化）
手动配置 webpack
默认配置文件的名字是 webpack.config.js/webpackfile.js 通常使用 webpack.config.js
webpack 是基于 node 编写的

- 配置脚本命令 package.json
  "scripts": { } 这里面配置的命令叫做脚本
  -- config 指定默认运行文件是哪个
  "build": "webpack --config webpack.config.js",
  "dev": "webpack-dev-server"
  "start":"npm run dev"
  这样就可以通过 npm run dev/npm run build 执行相关的命令
- 配置出口入口
  [x]entry 入口 可以是相对路径
  [x]output 出口 输出
  path 输出路径 必须是绝对路径 打包过后的文件夹名称
  filename:打包以后的文件名称
  module.exports={
  entry:'./src/index.js',
  output:{
  path:path.resolve(\_\_dirname,'dist'),
  filename:'bundle[hash:6].js',
  publicPath:'http://www.baidu.com'
  }
  }
  直接给文件加 hash 值(防止浏览器缓存)
  filename:'bundle[hash].js'
  可以用:后面跟数字设置 hash 值的长度
  filename:'bundle[hash:8].js'
  \* 配置打包环境
  mode  的值 2 个值 development 和 production
  development 开发环境
  production 生产环境
  module.exports={
  mode:'development',
  ...
  }
- 开发服务器配置
  yarn add webpack-dev-server -D||npm install webpack-dev-server
  devServer:{
  port:3000, #端口号
  contentBase:'./dist', #目录 如果没有 dist 文件夹 会在内存里面自动创建
  open:true, #是否自动打开浏览器
  progress:true, #显示进度条
  compress:true #是否开启 gzip 压缩
  proxy:{
  //可以配置跨域
  }
  }
  处理 html
  src

index.js
index.html
yarn add html-webpack-plugin -D||npm install html-webpack-plugin
当有插件的时候需要配置 plugins 插件集合类型是数组
每一个插件都是通过 new 来调用，例：new HtmlWebpackPlugin()
可以运行 npm run dev/npm run build 查看结果
装完插件后运行 webpack 会自动引入我们作为入口的 index.js
{

- template:'./src/index.html',//使用哪里的 html 做模板
- filename:'index.html', //编译后的文件名
  hash:true,//加 hash 值
  minify:{ //压缩配置
  removeAttributeQuotes:true, //去除双引号
  collapseWhitespace: true, //折叠去除空格
  }
  }
  处理样式 在 webpack 里面一切皆模块
  src

index.html
index.js
style.css
. index.js 通过 require require('/style.css') 报错如下

You may need an appropriate loader to handle this file type
appropriate 合适的
 你可能需要一个合适的 loader
. 配置 module,配置 rules 数组，表示很多规则，用正在匹配 js、css 等,rules 里面配置不容的 loader,每个 loader 的配置都是一个对象
module:{
rules:[]
}
loader 的配置方法 test 匹配规则 use 使用什么 loader yarn add css-loader style-loader -D|| npm install css-loader style-loader -D

test 表示什么文件使用当前的 loader 用正则配置
use 的用法
字符串 只能写一个 loader use:'css-loader'
数组 可以写多个 loader 数组里面可以放字符串和对象 css-loader 解析 require/import 语法 style-loader 把 css 插入到 header 标签中
use:['style-loader','css-loader'] loader 的执行顺序是从右到左执行 从下到上

rules:[
{
test:'/\.css\$/',//匹配以 css 结尾的文件
use:[]
}
]
.use 可以直接写 loader，也可以写成对象，写对象的时候可以进行配置 options 可以做一些自定义的配置
{
loader:'style-loader',
options:{
insertAt:'top' //css 放置位置可以决定 css 的优先级
}
src

index.html
index.js
style.css
b.less
配置 less 编译(less->css) 因为从右向左，从下到上执行 所以写在下边和右边 yarn add less less-loader -D
编译 sass node-sass sass-loader -D
编译 stylus stylus stylus-loader -D
{
test:/\.less$/,
    use:[
       'style-loader',
       'css-loader',
       'less-loader'
    ]
 }
抽离 css
 yarn add mini-css-extract-plugin -D
MiniCssExtractPlugin 插件自带一个 loader
MiniCssExtractPlugin.loader 会自动把 css 抽离出来 作为引用的方式引入页面 
  new MiniCssExtractPlugin({
      filename: 'main.css' ##抽离出来的css的文件名
    })
 在 loader 里面的写法
  use: [MiniCssExtractPlugin.loader, "css-loader"]
使用 postcss-loader,autoprefixer 添加浏览器前缀
 yarn add postcss-loader autoprefixer -D
autoprefixer 自动添加浏览器前缀的插件
安装 postcss 插件 yarn add postcss-preset-env -D 允许使用 css 未来特性的插件
{
  test:/\.less$/,
use:[
MiniCssExtractPlugin.loader,
'css.loader',
'less-loader',
'postcss-loader'
]
}
需要配置 postcss 默认文件 名字 在根目录下创建 postcss.config.js/.postcssrc.js

放到所有 cssloader 后面，执行顺序原因

npm run dev 的时候会报错
Error: No PostCSS Config found in: /Users/ruanye/Desktop/project/src
没有找到 postcss 的默认文件
postcss.config.js 文件里面的内容：
module.exports={
plugins:[require('autoprefixer')]
}
/允许你使用未来的 CSS 特性。
const postcssPresetEnv = require('postcss-preset-env');
// 自动添加浏览器前缀
const autoprefixer = require('autoprefixer');
module.exports = {
plugins: [
postcssPresetEnv,
autoprefixer({})
]
};
在使用 autoprefixer 做兼容性前缀时，我们要指定浏览器版本来确定在指定版本中添加兼容性前缀。可以在 package.json 中的 browserslist 字段中指定。或者单独建立一个.browserslistrc 文件
处理 js es6 转化成 es5
yarn add babel-loader @babel/core @babel/preset-env
@babel/core babel 核心模块 @babel-preset-env 标准语法转化成低级语法

presets 预设插件 比如定案的 promise 是不会被转化的
yarn add @babel/polyfill 已经废弃
{
"presets": [
[
"@babel/preset-env",
{
"useBuiltIns": "entry" 自动注入依赖
}
]
]
}
useBuiltIns 需要依赖 core-js

npm install --save core-js@2

yarn add @babel/plugin-transform-runtime @babel/runtime
@babel/plugin-transform-runtime 是依赖于 @babel/runtime 的
@babel/runtime 是生产环境也需要的下载的时候不要加-D
作用 @babel/plugin-transform-runtime 去除重复代码 第二种写法 @babel/plugin-transform-runtime 去注入 core-js 需要下载 yarn add @babel/runtime-corejs2
在 runtime 插件里配置 core-js 的好处
创建一个沙箱坏境(干净的坏境，代码不受外部的任何影响)
配置需要解析和不需要解析 loader 的文件路径
include 包含 include:path.resolve(**dirname,'src'),
exclude 不包含 exclude:/node_modules/
{
test:/\.js\$/,
use:{
loader:'babel-loader',
options:{
...
}
},
include:path.resolve(**dirname,'src'),
exclude:/node_modules/
}
babel 也可以独立进行配置，文件名字.babelrc
配置的时候 loader 直接写成 use:'babel-loader',其他配置写在.babelrc 里面
{
presets:['@babel/preset-env'],
plugins:[
....
]
}
如果 webpack options 对 babel-loader 进行了配置 不需要.babelrc 文件 如果有的就删除
js 语法校验
yarn add eslint eslint-loader -D
初始化 eslint 配置文件
npx eslint --init
添加 enforce pre 强制先执行 previous 前置 loader
{
enforce:'pre',
test:'/\.js\$/',
loader:'eslint-loader',
}
desServer 下配置项 有报错的时候出现透明的遮罩层,一般不配置

desServer{
overlay: true,
...
}

- 配置优化项
  yarn add optimize-css-assets-webpack-plugin
  terser-webpack-plugin -D optimize: 优化 assets:资源 optimize-css-assets-webpack-plugin 压缩 css 的 terser-webpack-plugin 压缩 js 的 uglify 不支持 es6
  optimization: { 优化
  minimizer: [
  new OptimizeCssAssetsWebpackPlugin({}), new TerserWebpackPlugin({})
  ]
  }
  mode 改成 production
  npm run build 打包之后 csss 是压缩过的
  第三方模块的使用 
  yarn add jquery
  yarn add expose-loader -D
  expose-loader 负责把变量暴露给全局 loader
  内联 loader 的方式配置 基本不使用 
  import $ from "expose-loader?$!jquery"
  正常 loader 配置
  {
  test:require.resolve('jquery'),
  loader:"expose-loader?$"
}
通过 webpack 提供的内置插件
在 plugins 配置,ProvidePlugin webpack 自带插件
自带插件都需要引入 webpcak 模块
在每个模块中注入$对象 不需要引入可以直接使用$这里 window.$是 undefined;
  let webpack = require('webpack')
  ...
  new webpack.ProvidePlugin({
  \$:"jquery"
  })
  配置忽略打包项(主要是引入 cdn 资源的时候)
  105 KiB 18.2 KiB

externals:{
jquery:"jQuery"
}
通过插件引入 cdn 资源(web 前端优化的一种手段)
yarn add add-asset-html-cdn-webpack-plugin

new AddAssetHtmlCdnWebpackPlugin(true, {
jquery: 'https://cdn.bootcss.com/jquery/3.4.1/jquery.js',
vue: '//cdn.bootcss.com/vue/2.5.16/vue.min.js',
vueRouter: '//cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js',
}),
在 webpack 中引入图片的几种方式
src
index.js
style.css
b.less
index.html
logo.png
在 js 中创建图片来引入 import logo from './logo.png'; let img = new Image() ; img.src = logo document.body.appengChild(img) 会在内存里面创建一个新的图片
You may need an appropriate loader to handle this file type
你需要一个合适的 loader 去处理这个文件类型
在 css 引入 background(url)

需要把图片放到 dist 文件夹

图片处理
yarn add file-loader html-withimg-loader url-loader -D file-loader

{
test:/\.(png,jpg,gif)$/,
  user:'file-loader'
}
 在 html 引入图片打包会找不到文件 需要使用 html-withimg-loader 解决打包之后路径不对的问题
{
  test:/\.html$/,
user:'html-withimg-loader'
}
小图片转化成 base64 =>前端优化
在图片非常小的情况下不希望走 http 请求，一般情况下不会直接使用 file-loader 通常我们使用 url-loader
在图片小于多少 k 的时候可以做一个限制，用 base64 来转化,base64 大小会比原来文件大 3 分之 1 
1024b = 1kb 1024kb = 1m 1g = 1024m
limit 限制图片大小多大以内  转成 base64 { test:/.(png,jpg,gif)$/, user:{ loder:'url-loader', options:{ limit:10000 表示多少字节 1024 字节是 1kb } } }
url-loader 可以处理 mp4|webm|ogg|mp3|wav|flac|aac
url-loder 可以处理各种字体格式 woff2?|eot|ttf|otf
file-loader 字体话一般建议用 file-loader，字体转 64 可能存在无法识别 file-loader 就是简单的复制粘贴
{
     test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
loader: 'url-loader',
options: {
limit: 0,
}
},
{
test: /\.(woff2?|eot|ttf|otf)(\?.\*)?\$/,
loader: 'url-loader',
options: {
limit: 0

        }
      }

- 打包文件分类
  图片 loader 的 options 里面添加 options:{ limit:1000 outputPath:'/img/', }
  css 添加在 css 插件里面 new MiniCssExtractPlugin({ filename:'css/main.css' })
  js 添加到 filename 前面 filename:'js/main[hash].js',
  添加域名 publicPath 的用法
  output: { filename: 'bundle.js', path: path.resolve(\_\_dirname, 'build'), publicPath:'http://www.baidu.cn' }
  如果只需要图片添加域名 options:{ limit:1, outputPath:'/img/', publicPath:'http://www.baidu.cn' }
  webpack 配置篇
  webpcak 常用插件
  yarn add clean-webpack-plugin -D 清除缓存插件,可以写字符串 也可以写成数组 new CleanWebpackPlugin();
  每次自动删除 dist 目录下的所有文件
  yarn add copy-webpack-plugin -D 拷贝插件 new CopyWebpackPlugin([ // {from:'img',to:'./'} ]),
  版权插件 webpack 自带插件 let webpack = require('webpack') new webpack.BannerPlugin('make 2019 by ry')
  打包多页应用
  入口需要配置成对象
  entry:{
  home:'./src/index.js'
  other:'./src/other.js'
  }
  出口需要多个出口，改变 filename 的写法 filename:'[name.js]'
  保证 html 页面引入自己对应的 js 使用 chunks 代码块 来完成
  chunks:['home']
  如果 home 也许使用 other chunks:['home','other']
  配置 soure-map 源码映射
  文档地址 :https://webpack.docschina.org/configuration/devtool/

devtool:'source-map'
source-map 会单独生成一个 sourcemap 文件 可以帮我们调试源代码 会显示当前报错的列和行

eval-source-map 不会产生单独的文件 但是会显示报错的行和列

cheap-module-source-map 不会产生列 但是是一个单独的文件
cheap-module-eval-source-map 不会产生文件也不会产生列 会直接集成在文件里
实时编译
watch:true

监控的选项
watchOptions:{
poll:1000 //每秒问我多少次
aggreatmentTimeout:500 //防抖 一直输入代码
ignored:/node_modules/
}
webpack 处理 跨域问题
webpack 自带 express \*代理的方式 重写的方式 把请求代理到 express 服务器上
target 访问http://localhost:3000 等于访问 当前服务器下面 '/api'
pathRewrite 重写路径 /api/user 等于访问 localhost:3000/user
devServer:{
...
proxy:{ //
'/api':{
target:'http://localhost:3000',
pathRewrite:{'/api':''}
}// 配置了一个代理
}
}
直接使用 webpack 提供 mock 数据 webpack 自带 express
webpack 提供一个方法 before
参数是 app app 就是 let app= express()
before(app){
app.get('/user',(req,res)=>{
res.json({name:'leilei'})
})
}
可以直接在 node 的服务端启动 webpack 端口是服务端端口 不在需要 npm run dev 来启动 webpack
yarn add webpack-dev-middleware -D server.js 修改如下
let webpack = require('webpack');

let middle = require('webpack-dev-middleware');

let config = require('./webpack.config.js');

let compiler = webpack(config);

app.use(middle(compiler));
resolve 用法
extensions 拓展名 alias:别名 bootstrap:'bootstrap/dist/css/bootstrap.css' mainFields 可以配置先找哪个入口 mainFiles：入口文件的名字

resolve:{
modules:[path.resolve('node_modules')],
extensions:['.js','.css','.json','.vue'],
mainFields:['style','main']
mainFiles:[], // 入口文件的名字 index.js
alias:{
bootstrap:'bootstrap/dist/css/bootstrap.css'
}
}
区分环境
webpack.config.js 改成 webpack.base.js 新建文件 webpack.prod.js 和 webpack.dev.js

配置开发环境的写法
webpack.dev.js
let {smart} = require('webpack-merge');
let base = require('./webpack.base.js');

module.exports = smart(base,{
mode: 'development',
devServer:{

},
devtool:'source-map'
})
配置生产环境的写法
let {smart} = require('webpack-merge');
let base = require('./webpack.base.js');

module.exports = smart(base,{
mode: 'production',
optimization:{
minimizer:[

     ]

},
plugins:[]
})
webpack 优化
noparse module: { noParse: /jquery/, // 不去解析 jquery 中的依赖库 ... }
dllplugin 3.
