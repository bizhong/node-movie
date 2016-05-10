// 跨浏览器的添加事件处理程序
function addEvent(element, type, fn) {
    if (element.addEventListener) {
        element.addEventListener(type, fn, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + type, fn);
    } else {
        element["on" + type] = fn;
    }
}

// 跨浏览器的移除事件处理程序
function removeEvent(element, type, fn) {
    if (element.removeEventListener) {
        element.removeEventListener(type, fn, false);
    } else if (element.detachEvent) {
        element.detachEvent("on" + type, fn);
    } else {
        element["on" + type] = null;
    }
}

// 返回对拥有指定 ID 的第一个对象的引用
function getId(element) {
    return document.getElementById(element);
}

var body = document.body || document.getElementsByTagName('body')[0],
    doubanMovieId = getId("douban-movie-id"),
    movieTitle = getId("movie-title"),
    movieAka = getId("movie-aka"),
    moviePoster = getId("movie-poster"),
    movieCategories = getId("movie-categories"),
    movieDirectors = getId("movie-directors"),
    movieCasts = getId("movie-casts"),
    movieYear = getId("movie-year"),
    movieCountries = getId("movie-countries"),
    movieSummary = getId("movie-summary");

// 回调函数
function jsonpCallback(movie) {
    // 输出 movie
    // for (var i in movie) {
    //     console.log(i + ": " + movie[i]);
    // }
    
    // 遍历数组，返回一个由每个数组元素拼接的字符串
    function arrayForEach(arrayname, name) {
        var str = "";
        arrayname.forEach(function(value) {
            str += name ? (value.name + "、") : (value + "、");
        });
        return str.slice(0, -1);
    }

    movieTitle.value = movie.title;
    movieAka.value = arrayForEach(movie.aka);
    moviePoster.value = movie.images.large;
    movieCategories.value = arrayForEach(movie.genres);
    movieDirectors.value = arrayForEach(movie.directors, "name");
    movieCasts.value = arrayForEach(movie.casts, "name");
    movieYear.value = movie.year;
    movieCountries.value = arrayForEach(movie.countries);
    movieSummary.value = movie.summary;
}

// blur 事件处理函数
function blurEvent() {
    var id = doubanMovieId.value;

    // JSONP 跨域请求获取豆瓣 Movie API ID 为 id 的电影条目信息数据
    var JSONP = document.createElement("script");
    JSONP.type = "text/javascript";
    JSONP.src = "https://api.douban.com/v2/movie/subject/" + id + "?callback=jsonpCallback";
    body.appendChild(JSONP);
}

// 添加 blur 事件
addEvent(doubanMovieId, "blur", blurEvent);