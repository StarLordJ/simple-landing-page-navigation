
function scriptGo(src) {
    var script = document.createElement("script");
    script.src = src;
    document.head.appendChild(script);
}

function styleGo(src) {
    var style = document.createElement("link");
    style.href = src;
    style.rel = "stylesheet";
    style.type = "text/css";
    document.head.appendChild(style);
}

function prepareIEAndEdge() {
    if (document.documentMode) { // Определяем IE, подключаем core.js
        scriptGo("Scripts/core.min.js");
    }

    if (/Edge/.test(navigator.userAgent) || document.documentMode) { // Для IE и Edge подключаем smoothscroll-polyfill
        scriptGo("Scripts/smoothscroll.min.js");
    }
}

prepareIEAndEdge();
scriptGo("Scripts/slider.js");
scriptGo("Scripts/main.js");
