// 加载模块
// 加载 mongoose 模块
var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

// 定义电影评论模式
var CommentSchema = new mongoose.Schema({
    movie: {
        type: ObjectId,
        ref: 'Movie'
    },
    from: {
        type: ObjectId,
        ref: 'User'
    },
    reply: [{
        from: {
            type: ObjectId,
            ref: 'User'
        },
        to: {
            type: ObjectId,
            ref: 'User'
        },
        content: String
    }],
    content: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

// 定义电影评论模式方法
CommentSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});
CommentSchema.statics = {
    fetch: function(cb) {// 取出目前数据库中所有的数据
        return this.find({}).sort('meta.updateAt').exec(cb);
    },
    findById: function(id, cb) {// 查询单条数据
        return this.findOne({_id: id}).exec(cb);
    }
};

// 编译电影评论模型
var Comment = mongoose.model('Comment', CommentSchema);

// 导出电影评论模型
module.exports = Comment;