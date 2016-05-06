// 加载模块
// 加载 mongoose 模块
var mongoose = require('mongoose');
// 加载密码存储算法模块
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;

// 创建用户模式
var UserSchema = new mongoose.Schema({
    username: {
        unique: true,
        type: String
    },
    password: String,
    grade: {// 普通用户0，认证用户1，专业用户2，管理员3，超级管理员4
        type: Number,
        default: 0
    },
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

// 定义用户模式方法
UserSchema.pre('save', function(next) {
    var user = this;
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    bcrypt.hash(user.password, null, null, function(err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});
UserSchema.methods = {
    comparePassword: function(_password, cb) {
        bcrypt.compare(_password, this.password, function(err, isMatch) {
            if (err) {
                return cb(err);
            }
            cb(null, isMatch);
        });
    }
};
UserSchema.statics = {
    fetch: function(cb) {// 取出目前数据库中所有的数据
        return this.find({}).sort('meta.updateAt').exec(cb);
    },
    findById: function(id, cb) {
        return this.findOne({_id: id}).exec(cb);
    }
};

// 编译用户模型
var User = mongoose.model('User', UserSchema);

// 导出用户模型
module.exports = User;