// 加载用户模型
var User = require('../models/user.js');

// 登录
exports.signin = function(req, res) {
    var _user = req.body.user,
        username = _user.username,
        password = _user.password,
        save = req.param('save');
    User.findOne({username: username}, function(err, user) {
        if (err) {
            console.log(err);
        }
        if (!user) {
            return res.redirect('/');
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
                return res.redirect('/');
            } else {
                return res.redirect('/');
            }
        });
    });
};

// 注册
exports.signup = function(req, res) {
    var _user = req.body.user,
        username = _user.username,
        save = req.param('save');
    User.findOne({username: username}, function(err, user) {
        if (err) {
            console.log(err);
        }
        if (user) {
            return res.redirect('/');
        } else {
            user = new User(_user);
            user.save(function(err, user) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/');
            });
        }
    });
};

// 登出
exports.signout = function(req, res) {
    delete req.session.user;
    res.redirect('/');
};