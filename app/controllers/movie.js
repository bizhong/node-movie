// 加载电影模型、电影分类模型、电影评论模型
var Movie = require('../models/movie.js');
var Category = require('../models/category.js');
var Comment = require('../models/comment.js');

// 发布电影
exports.post = function(req, res) {
    // Category.find({}, function(err, categories) {
    //     res.render('admin',{
    //         title: '发布电影 - 电影',
    //         categories: categories,
    //         movie: {}
    //     });
    // });
    res.render('admin',{
        title: '发布电影'
    });
};