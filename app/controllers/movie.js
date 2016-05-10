// 加载电影模型、电影分类模型、电影评论模型
var Movie = require('../models/movie.js');
var Category = require('../models/category.js');
var Comment = require('../models/comment.js');

// 详情电影页
exports.detail = function(req, res) {
    // body...
};
// 发布电影
exports.post = function(req, res) {
    Category.find({}, function(err, categories) {
        res.render('admin',{
            title: '发布电影',
            categories: categories,
            movie: {}
        });
    });
};

// 保存电影
exports.save = function(req, res) {
    // body...
};

// 更改电影

exports.update = function(req, res) {
    // body...
};

// 电影列表
exports.list = function(req, res) {
    // body...
};

// 删除电影
exports.delete = function(req, res) {
    // body...
};