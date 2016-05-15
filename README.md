# node-movie

Movie（电影）是用 Node.js 和 MongoDB 实现的 Web 应用程序。

## 概览

- [项目结构](#project-structure)
- [项目功能](#project-function)
- [下载演示](#download-demo)
- [页面展示](#pages-display)

## [项目结构][1]

```
- movie(项目根目录)
    |- app(应用程序根目录)
        |- controllers(控制器)
            |- category.js(分类目录控制器)
            |- comment.js(评论控制器)
            |- index.js(首页控制器)
            |- movie.js(电影详情页控制器)
            |- search.js(搜索控制器)
            |- user.js(用户控制器)
        |- models(模型)
            |- category.js(分类目录模型)
            |- comment.js(评论模型)
            |- movie.js(电影模型)
            |- user.js(用户模型)
        |- routes(路由)
            |- routes.js(所有路由)
        |- views(视图)
            |- layouts
                |- common.html(所有前端页面的母版)
            |- pages
                |- admin.html(管理员操作页面：发布电影、修改电影)
                |- index.html(首页、分类目录页面、搜索页面)
                |- movie-list.html(电影列表页面)
                |- movie.html(详情电影页面)
    |- public(应用程序静态文件)
        |- css(CSS脚本所在地)
        |- images(图片所在目录)
        |- js(JavaScript脚本所在地)
        |- upload(上传图片存放地)
    |- .gitignore(哪些文件及文件夹不上传到代码库里面)
    |- app.js(应用程序主文件)
    |- package.json(配置文件)
    |- README.md(项目说明)
```

## [项目功能][2]

- 游客：浏览首页、电影详情页面、分类目录页面、搜索电影

用户和管理员除了有游客的权限外还有以下权限：

- 用户：登录、注册、评论电影

- 管理员：登录、发布电影、修改电影、删除电影、评论电影

## [下载演示][3]

- Download ZIP
- 解压到当前文件夹
- 双击打开“`node-movie-master`”文件夹
- 右击“`Git Bash Here`”（已安装 Git）
- Git Bash 中运行命令（已安装 Node）

```
npm install bcrypt-nodejs body-parser connect-mongo connect-multiparty cookie-parser express express-session fs moment mongoose morgan path serve-static swig underscore --save
```

- Git Bash 中运行命令

```
node app
```

- 打开浏览器，输入“localhost:3000”

## [页面展示][4]

- 首页

![首页][5]

- 电影详情页面

![电影详情页面][6]

- 分类目录页面

![分类目录页面][7]

- 搜索页面

![搜索页面][8]

- 管理员发布电影页面

![管理员发布电影页面][9]

- 电影列表页面

![电影列表页面][10]


  [1]: #project-structure
  [2]: ##project-function
  [3]: #download-demo
  [4]: #pages-display
  [5]: https://github.com/bizhongbio/node-movie/blob/master/public/images/screenshot/0.png
  [6]: https://github.com/bizhongbio/node-movie/blob/master/public/images/screenshot/1.png
  [7]: https://github.com/bizhongbio/node-movie/blob/master/public/images/screenshot/2.png
  [8]: https://github.com/bizhongbio/node-movie/blob/master/public/images/screenshot/3.png
  [9]: https://github.com/bizhongbio/node-movie/blob/master/public/images/screenshot/4.png
  [10]: https://github.com/bizhongbio/node-movie/blob/master/public/images/screenshot/5.png