// 加载用户模型
var User = require('../models/user.js');

// 登录
exports.signin = function(req, res) {
    var _user = req.body.user,
        username = _user.username,
        password = _user.password,
        save = req.param('save'),
        urlpathname = req.param('cur_URL');
    User.findOne({username: username}, function(err, user) {
        if (err) {
            console.log(err);
        }
        if (!user) {
            return res.redirect(urlpathname);
        }
        user.comparePassword(password, function(err, isMatch) {
            if (err) {
                console.log(err);
            }
            if (isMatch) {
                console.log('Password is matched.');
                req.session.user = user;
                // if (save != undefined && save == "yes") {
                //     console.log("YES");
                //     res.cookie('username', username, {maxAge: 24 * 60 * 60 * 1000});// 过期时间一天
                //     res.cookie('password', password, {maxAge: 24 * 60 * 60 * 1000});
                // } else {
                //     console.log("NO");
                // }
                return res.redirect(urlpathname);
            } else {
                return res.redirect(urlpathname);
            }
        });
    });
};

// 注册
exports.signup = function(req, res) {
    var _user = req.body.user,
        username = _user.username,
        save = req.param('save'),
        urlpathname = req.param('cur_URL');
    User.findOne({username: username}, function(err, user) {
        if (err) {
            console.log(err);
        }
        if (user) {
            return res.redirect(urlpathname);
        } else {
            user = new User(_user);
            user.save(function(err, user) {
                if (err) {
                    console.log(err);
                }
                res.redirect(urlpathname);
            });
        }
    });
};

// 登出
exports.signout = function(req, res) {
    delete req.session.user;
    res.redirect('/');
};

// 用户是否登录
exports.signedIn = function(req, res, next) {
    var user = req.session.user;
    if (!user) {
        return res.redirect('/');
    }
    next();
};

// 用户登录后判断是否是管理员
exports.adminSignedIn = function(req, res, next) {
    var user = req.session.user;
    if (user.role < 3) {
        return res.redirect('/');
    }
    next();
};