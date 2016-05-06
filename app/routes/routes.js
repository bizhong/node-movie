var Index = require('../controllers/index.js');
var User = require('../controllers/user.js');

module.exports = function(app) {
    app.use(function(req, res, next) {
        var _user = req.session.user;
        app.locals.user = _user;// 用户信息放到环境变量中
        next();
    });
    // 首页
    app.get('/', Index.index);

    // 用户
    app.post('/user/signin', User.signin);// 登录页面
    app.post('/user/signup', User.signup);// 注册页面
    app.get('/user/signout', User.signout);// 登出页面
};