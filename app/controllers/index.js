// 加载电影模型、电影分类模型、电影评论模型
var Category = require('../models/category.js');
var Movie = require('../models/movie.js');

// 首页
exports.index = function(req, res) {
    // console.log("Cookies: ", req.cookies);

    var catlists = [];
    Category.find({}, function(err, categories) {
        catlists = categories;
    });
    
    Movie.find({}, function(err, movies) {
        res.render('index',{
            title: '电影',
            catlists: catlists,
            movies: movies.reverse()
        });
    });
};