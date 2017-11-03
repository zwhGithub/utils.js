/*
    根据url获取参数
*/
function getRequestData(key) {
    var url = window.location.search; //获取url中"?"符后的字串
    var theRequest = {};
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return theRequest[key] ? theRequest[key] : '';
}


/*

    弹框 toast

*/

function Toast(text, time) {
    var time = time || 1500;
    var wh_toast = document.createElement("div");
    wh_toast.style =
        "position: fixed;z-index: 9999;line-height: 17px;left: 50%;transform: translate(-50%, 0);top: 43%;opacity:0";
    var wh_toast_box = document.createElement("div");
    wh_toast_box.style =
        "font-size: 14px;padding: 12px 16px;text-align: center;color: #fff;border-radius: 6px;background: #323232;opacity: .9;";
    wh_toast_box.innerHTML = text;
    wh_toast.appendChild(wh_toast_box);
    document.body.appendChild(wh_toast);
    var i = 0;
    var n = 1;
    function fade_in() {
        i += 0.25;
        wh_toast.style.opacity = i;
        if (i == 1) {
            window.clearInterval(timer1);
        }
    }
    var timer1 = window.setInterval(fade_in, 100);
    window.setTimeout(function () {
        function fade_out() {
            n -= 0.25;
            wh_toast.style.opacity = n;
            if (n == 0) {
                window.clearInterval(timer2);
                document.body.removeChild(wh_toast);
            }
        }
        var timer2 = window.setInterval(fade_out, 100);
    }, time - 400);
}


/*

*/