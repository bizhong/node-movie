// 加载电影模型、电影分类模型、电影评论模型
var Movie = require('../models/movie.js');

// 搜索
exports.search = function(req, res) {
    var keyword = req.query.search;
    Movie.find({title: new RegExp(keyword + '.*', 'i')}, function(err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('index', {
            title: '电影搜索结果',
            pageUrl: req.getUrl(),
            page: 'search',
            keyword: keyword,
            movies: movies,
            total: movies.length
        });
    });
};