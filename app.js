// 加载 npm 包
var express = require('express');
var mongoose = require('mongoose');
var swig = require('swig');
var morgan = require('morgan');
var path = require('path');
var fs = require('fs');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var cookiePaser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var app = express();

var port = process.env.PORT || 3000;
var dbUrl = 'mongodb://localhost/movie';
mongoose.connect(dbUrl);

var models_path = __dirname + '/app/models';
var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js|coffee)/.test(file)) {
                require(newPath);
            } else if (stat.isDirectory()) {
                walk(newPath);
            }
        }
    });
};
walk(models_path);

// 设置模板引擎
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
app.set('views', './app/views/pages');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookiePaser());
app.use(session({
    secret: 'movie',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        url: dbUrl,
        collection: 'sessions'
    })
}));
app.use(serveStatic(path.join(__dirname, 'public')));
app.locals.moment = require('moment');
app.listen(port);

// 设置入口文件，输出日志和错误信息
var env = process.env.NODE_ENV || 'development';
if ('development' === env) {
    app.set('showStackError', true);
    app.use(morgan(':method :url :status'));
    app.locals.pretty = true;// 格式化源代码
    mongoose.set('debug', true);
}
// 路由
var routes = require('./app/routes/routes.js');
routes(app);
// 打印日志
console.log('Movie started on port ' + port);