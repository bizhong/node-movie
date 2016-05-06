exports.index = function(req, res) {
    // console.log("Cookies: ", req.cookies);
    res.render('index', {
        title: '电影'
    });
};