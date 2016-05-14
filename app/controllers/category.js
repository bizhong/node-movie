// 加载电影分类模型
var Category = require('../models/category.js');

// 分类目录
exports.index = function(req, res) {
    var id = req.params.id;
    Category.find({_id: id}).populate({path: 'movies', select: 'title poster'}).exec(function(err, categories) {
        if (err) {
            console.log(err);
        }
        var category = categories[0];
        var cname = category.name;
        var movies = category.movies.reverse();
        var total = movies.length;
        res.render('index', {
            title: cname + ' - 电影',
            page: 'category',
            category: cname,
            movies: movies,
            total: total
        });
    });
};