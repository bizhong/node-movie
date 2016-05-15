// 加载电影模型、电影分类模型、电影评论模型
var Movie = require('../models/movie.js');
var Category = require('../models/category.js');
var Comment = require('../models/comment.js');

var _ = require('underscore');
var fs = require('fs');
var path = require('path');

// 详情电影页
exports.detail = function(req, res) {
    var id = req.params.id;
    Movie.update({_id: id}, {$inc: {clicks: 1}}, function(err) {
        if (err) {
            console.log(err);
        }
    });
    Movie.findById(id, function(err, movie) {
        Comment.find({movie: id}, function(err, comments) {
            res.render('movie', {
                title: movie.title + ' - 电影',
                movie: movie,
                comments: comments.reverse()
            });
        });
    });
};

// 发布电影
exports.post = function(req, res) {
    Category.find({}, function(err, categories) {
        res.render('admin', {
            title: '发布电影',
            categories: categories,
            movie: {}
        });
    });
};

// 保存本地上传的电影海报
exports.savePoster = function(req, res, next) {
    // var posterData = req.files.upload_poster;
    // var filePath = posterData.path;
    // var originalFilename = posterData.originalFilename;

    // if (originalFilename) {
    //     fs.readFile(filePath, function(err, data) {
    //         var timestamp = Date.now();
    //         var type = posterData.type.split('/')[1];
    //         var poster = timestamp + '.' + type;
    //         var newPath = path.join(__dirname, '../../', '/public/upload/' + poster);
    //         fs.writeFile(newPath, data, function(err) {
    //             req.poster = poster;
    //             next();
    //         });
    //     });
    // } else {
    //     next();
    // }
    next();
};

// 保存电影
exports.save = function(req, res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;
    if (req.poster) {
        movieObj.poster = req.poster;
    }
    if (id) {
        Movie.findById(id, function(err, movie) {
            if (err) {
                console.log(err);
            }
            _movie = _.extend(movie, movieObj);
            _movie.save(function(err, movie) {
                if (err) {
                    console.log(err);
                }
                var categoryId = movie.category;
                Category.findById(categoryId, function(err, category) {
                    category.movies.push(movie._id);
                    category.save(function(err, category) {
                        res.redirect('/');
                    });
                });
            });
        });
    } else {
        _movie = new Movie(movieObj);
        var categoryId = movieObj.category;
        var categoryName = movieObj.category_name;
        _movie.save(function(err, movie) {
            if (err) {
                console.log(err);
            }
            if (categoryId) {
                Category.findById(categoryId, function(err, category) {
                    category.movies.push(movie._id);
                    category.save(function(err, category) {
                        res.redirect('/');
                    });
                });
            } else if (categoryName) {
                var category = new Category({
                    name: categoryName,
                    movies: [movie._id]
                });
                category.save(function(err, category) {
                    movie.category = category._id;
                    movie.save(function(err, movie) {
                        res.redirect('/');
                    });
                });
            }
        });
    }
};

// 修改电影
exports.update = function(req, res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function(err, movie) {
            Category.find({}, function(err, categories) {
                res.render('admin', {
                    title: '修改电影',
                    movie: movie,
                    categories: categories
                });
            });
        });
    }
};

// 电影列表
exports.list = function(req, res) {
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('movie-list', {
            title: '电影列表',
            movies: movies.reverse()
        });
    });
};

// 删除电影
exports.delete = function(req, res) {
    var id = req.params.id;
    console.log(id);
    if (id) {
        Movie.remove({_id: id}, function(err, movie) {
            if (err) {
                console.log(err);
            } else {
                res.json({
                    success: 1
                });
            }
            res.redirect('/admin/movie/list');
        });
    }
};