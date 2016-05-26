var Index = require('../controllers/index.js');
var Category = require('../controllers/category.js');
var Search = require('../controllers/search.js');
var User = require('../controllers/user.js');
var Movie = require('../controllers/movie.js');
var Category = require('../controllers/category.js');
var Comment = require('../controllers/comment.js');

// 加载文件上传中间件
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

module.exports = function(app) {
    app.use(function(req, res, next) {
        var _user = req.session.user;
        app.locals.user = _user;// 用户信息放到环境变量中

        // 获取页面完整 URL
        req.getUrl = function() {
            return req.protocol + '://' + req.get('host') + req.originalUrl;
        };
        next();
    });

    // 首页
    app.get('/', Index.index);

    // 详情电影页
    app.get('/movie/:id', Movie.detail);

    // 分类目录
    app.get('/category/:id', Category.index);

    // 搜索
    app.get('/search', Search.search);

    // 用户
    app.post('/user/signin', User.signin);// 登录
    app.post('/user/signup', User.signup);// 注册
    app.get('/user/signout', User.signout);// 登出
    app.post('/user/comment', User.signedIn, Comment.save);//评论

    // 管理员
    app.get('/admin/movie/post', User.signedIn, User.adminSignedIn, Movie.post);// 发布电影
    app.post('/admin/movie/save', multipartMiddleware, User.signedIn, User.adminSignedIn, Movie.savePoster, Movie.save);// 保存电影
    app.get('/admin/movie/update/:id', User.signedIn, User.adminSignedIn, Movie.update);// 修改电影
    app.get('/admin/movie/list', User.signedIn, User.adminSignedIn, Movie.list);// 电影列表
    app.get('/admin/movie/delete/:id', User.signedIn, User.adminSignedIn, Movie.delete);// 删除电影
};