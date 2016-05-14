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

// 主函数
function handler() {
    var body = document.body || document.getElementsByTagName('body')[0],
        header = getId("header"),
        signIn = getId("sign-in"),
        signUp = getId("sign-up"),
        boolSoH = false,
        localNav = getId("local-nav"),
        btnLocalNav = getId('btn-local-nav');

    // 头部点击处理函数，事件委托
    function headerClick(event) {
        event = event || window.event;
        var target = event.target || event.srcElement,
            btnNav = getId("btn-nav"),
            menu = getId("menu"),
            btnBack = getId("btn-back"),
            search = getId("search"),
            searchInput = getId("search-input"),
            searchSubmit = getId('search-submit'),
            btnSignIn = getId("btn-sign-in"),
            btnSignUp = getId("btn-sign-up");

        if (!getId("mask")) {
            var mask = document.createElement("div");
            mask.id = "mask";
            mask.className = "mask-hide";
            body.appendChild(mask);
        } else {
            var mask = getId("mask");
        }

        // 蒙板点击处理函数
        function maskClick() {
            switch(target) {
                case btnNav:
                    menu.className = "menu";
                    mask.className = "mask-hide";
                    mask.style.cssText = "";
                    break;
                case searchInput:
                    searchInput.blur();
                    header.className = "header";
                    searchSubmit.style.display = "none";
                    btnBack.style.display = "none";
                    mask.className = "mask-hide";
                    break;
                case btnSignIn:
                    signIn.style.display = "none";
                    mask.className = "mask-hide";
                    break;
                case btnSignUp:
                    signUp.style.display = "none";
                    mask.className = "mask-hide";
                    break;
            }
        }

        switch(target) {
            case btnNav:
                menu.className = "menu menu-show";
                mask.className = "mask-show";
                mask.style.cssText = "z-index: 2;";
                break;
            case searchInput:
                searchInput.focus();
                header.className = "header white";
                searchSubmit.style.display = "inline-block";
                btnBack.style.display = "block";
                mask.className = "mask-hide";
                break;
            case btnBack:
                searchInput.blur();
                header.className = "header";
                searchSubmit.style.display = "none";
                btnBack.style.display = "none";
                break;
            case btnSignIn:
                signIn.style.display = "block";
                mask.className = "mask-show";
                break;
            case btnSignUp:
                signUp.style.display = "block";
                mask.className = "mask-show";
                break;
        }
        addEvent(mask, "click", maskClick);
    }

    function localNavClick() {
        boolSoH = boolSoH ? false : true;
        localNav.style.display = boolSoH ? "block" : "none";
    }

    addEvent(header, "click", headerClick);
    addEvent(btnLocalNav, "click", localNavClick);
}

// 添加 DOMContentLoaded 事件，页面文档完全加载并解析完毕后触发
addEvent(document, "DOMContentLoaded", handler);

// 浏览器卸载页面之前移除页面中的所有事件处理程序
addEvent(window, "beforeunload", function(event) {
    removeEvent(document, "DOMContentLoaded", handler);
});