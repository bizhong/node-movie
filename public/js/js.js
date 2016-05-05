window.onload = function() {
    // 返回对拥有指定 ID 的第一个对象的引用
    function getId(element) {
        return document.getElementById(element);
    }
    // 跨浏览器的事件处理程序
    function addEvent(element, type, fn) {
        if (element.addEventListener) {
            element.addEventListener(type, fn, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, fn);
        } else {
            element["on" + type] = fn;
        }
    }

    var body = document.body || document.getElementsByTagName('body')[0],
        header = getId("header"),
        signIn = getId("sign-in"),
        signUp = getId("sign-up");
    
    function headerClick(event) {
        var event = event || window.event,
            target = event.target || event.srcEvent,
            btnNav = getId("btn-nav"),
            menu = getId("menu"),
            btnBack = getId("btn-back"),
            search = getId("search"),
            searchInput = getId("search-input"),
            btnSignIn = getId("btn-sign-in"),
            btnSignUp = getId("btn-sign-up");

        if (!getId("mask")) {
            var mask = document.createElement("div");
            mask.id = "mask";
            body.appendChild(mask);
        } else {
            var mask = getId("mask");
        }

        function btnBackClick() {
            searchInput.blur();
            header.className = "header";
            btnBack.style.display = "none";
        }

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
                btnBack.style.display = "block";
                mask.className = "mask-hide";
                addEvent(btnBack, "click", btnBackClick);
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

    addEvent(header, "click", headerClick);
};