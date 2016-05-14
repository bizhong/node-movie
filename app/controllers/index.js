// 加载电影模型、电影分类模型、电影评论模型
var Movie = require('../models/movie.js');

// 首页
exports.index = function(req, res) {
    // console.log("Cookies: ", req.cookies);
    Movie.find({}, function(err, movies) {
        res.render('index',{
            title: '电影',
            movies: movies
        });
    });
};