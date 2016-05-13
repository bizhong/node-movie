// 加载模块
// 加载 mongoose 模块
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

// 定义电影分类模式
var CategorySchema = new Schema({
    name: String,
    movies: [{type: ObjectId, ref: 'Movie'}],
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

// 定义电影分类模式方法
CategorySchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});
CategorySchema.statics = {
    fetch: function(cb) {// 取出目前数据库中所有的数据
        return this.find({}).sort('meta.updateAt').exec(cb);
    },
    findById: function(id, cb) {// 查询单条数据
        return this.findOne({_id: id}).exec(cb);
    }
};

// 编译电影分类模型
var Category = mongoose.model('Category', CategorySchema);

// 导出电影分类模型
module.exports = Category;