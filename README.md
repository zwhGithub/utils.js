### JavaScript 开发常用方法总结
1

- 获取地址URL地址栏的的参数

```
function getRequestData(key) {
    var url = window.location.search; //获取url中"?"符后的字串
    var theRequest = {};
    if (url.indexOf('?') != -1) {
        var str = url.substr(1);
        strs = str.split('&');
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1]);
        }
    }
    return theRequest[key] ? theRequest[key] : '';
}
// 使用方法
// 如果你当前地址是http://baidu.com?age=18
// 然后   getRequestData("age") == 18
```

- js数组去重

```
function uniq(array, key) {
    var temp = [];
    var l = array.length;
    for (var i = 0; i < l; i++) {
        for (var j = i + 1; j < l; j++) {
            if (array[i][key] === array[j][key]) {
                i++;
                j = i;
            }
        }
        temp.push(array[i]);
    }
    return temp;
}
// 使用方法  主要是为了那种有key-value的数组去重
// var array = [{ age: 1 }, { age: 2 }, { age: 3 }, { age: 2 }];
// uniq(array, "age") == [{ age: 1 }, { age: 2 }, { age: 3 }]


去除没有key-value的数组
let arr = [1, 2, 3, 1];
arr = Array.from(new Set(arr));  //去除重复的1
```

- js 存入 获取 删除 Cookie

```
//设置cook  iDay表示具体过期的天数
setCookie(name, value, iDay) {
    let oDate = new Date();
    oDate.setDate(oDate.getDate() + iDay);
    document.cookie = name + '=' + value + ';expires=' + oDate;
}

//获取cookie
getCookie(name) {
    let arr = document.cookie.split('; ');
    for (let i = 0; i < arr.length; i++) {
        let arr2 = arr[i].split('=');
        if (arr2[0] == name) {
            return arr2[1];
        }
    }
    return '';
}

//删除cookie
removeCookie(name) {
    this.setCookie(name, 1, -1);
}
```

- H5设置手机端rem

```
(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (clientWidth >= 768) {
                clientWidth = 768;
            }
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 375) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

// 以苹果6的尺寸为标准  然后 10px = 0.1rem 
```

- 移动端禁止滑动 

```
function preventPageScroll(e) {
    return e.preventDefault()
}
document.addEventListener('touchmove', preventPageScroll, false); //禁止滑动
document.addEventListener('touchmove', preventPageScroll, true); //取消禁止滑动

// 用浏览器调试无法显示效果  安卓和ios手机能很好的兼容
// 相比overflow = hidden 的方法  上述方法不会出现暴力滑动的一些问题
```
###  原生js封装的jquery方法  高性能

```
 function $(dom) {
        var obj = document;
        var arr = dom.split(" ");
        for (let i = 0; i < arr.length; i++) {
            var key = arr[i];
            if (key.substring(0, 1) == "#") {
                obj = obj.getElementById(key.substring(1, key.length));
            } else if (key.substring(0, 1) == ".") {
                obj = obj.getElementsByClassName(key.substring(1, key.length))[0];
            } else {
                obj = obj.getElementsByTagName(key)[0];
            }
        }
        //hasClass()
        this.Object.prototype.hasClass = function (cName) {
            return !!this.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
        }
        //addClass()
        this.Object.prototype.addClass = function (cName) {
            if (!this.hasClass(cName)) {
                this.className += " " + cName;
            }
            return this;
        }
        //removeClass()
        this.Object.prototype.removeClass = function (cName) {
            if (this.hasClass(cName)) {
                this.className = this.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " ");
            }
            return this;
        }
        return obj;
    }

//使用方法  高性能的选中dom  操作class
// 支持  选中dom $("#id")  $(".class")   $(div)  $("#a .b")  $(".a .b .c")   $("#a div")
// 上述的选中dom返回原生js选中的dom对象
// 还支持  $("#id").addClass("a")  $("#id").removeClass("a")
		  $("#id").hasClass("a")  //返回布尔值 
```

- 原生js封装的弹框

```
  function Toast(text, time) {
        var time = time || 1500;
        var wh_toast = document.createElement("div");
        wh_toast.style = "position: fixed;z-index: 9999;line-height: 17px;left: 50%;transform: translate(-50%, 0);top: 43%;opacity:0";

        var wh_toast_box = document.createElement("div");
        wh_toast_box.style = "font-size: 14px;padding: 12px 16px;text-align: center;color: #fff;border-radius: 6px;background: #323232;opacity: .9;"
        wh_toast_box.innerHTML = text;

        wh_toast.appendChild(wh_toast_box);
        document.body.appendChild(wh_toast);
        var i = 0;
        var n = 10;

        function fade_in() {
            i += 1;
            wh_toast.style.opacity = i / 10;
            if (i == 10) {
                window.clearInterval(timer1);
            }
        }
        var timer1 = window.setInterval(fade_in, 30)

        window.setTimeout(function() {
            function fade_out() {
                n -= 1;
                wh_toast.style.opacity = n / 10;
                if (n == 1) {
                    window.clearInterval(timer2);
                    document.body.removeChild(wh_toast);
                }
            }
            var timer2 = window.setInterval(fade_out, 30)
        }, time - 250)
    }

//使用方法  Toast(‘欢迎来到github’)  默认弹出1.5毫秒 效果在图下
```

![提示框效果](https://qiniu.epipe.cn/5430920025722585088?imageView2/1/w/320/h/568)

### 原生js时间格式化    

```
function Moment(date) {
    var date = date ? new Date(date) : new Date();

    this.Object.prototype.format = function(str) {
        var that = this;
        if (str == 'X') {
            return Math.round(that.getTime() / 1000);
        } else if (str == 'XX') {
            return that.getTime();
        } else {
            var str = str ? str : 'YYYY-MM-DD hh:mm:ss';
            function addZero(data) {
                if (data < 10) {
                    return '0' + data;
                } else {
                    return data;
                }
            }
            var _YYYY = that.getFullYear();
            var _MM = addZero(that.getMonth() + 1);
            var _DD = addZero(that.getDate());
            var _hh = addZero(that.getHours());
            var _mm = addZero(that.getMinutes());
            var _ss = addZero(that.getSeconds());
            var _ww = that.getDay();
            var arr1 = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
            var arr2 = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
            var _WW = arr1[_ww];
            _ww = arr2[_ww];
            var str = str
                .replace(/YYYY/g, _YYYY)
                .replace(/MM/g, _MM)
                .replace(/DD/g, _DD)
                .replace(/WW/g, _WW)
                .replace(/ww/g, _ww)
                .replace(/DD/g, _DD)
                .replace(/hh/g, _hh)
                .replace(/mm/g, _mm)
                .replace(/ss/g, _ss);

            return str;
        }
    };
    return date;
}

// 使用方法
// 	Moment().format('YYYY-MM-DD hh:mm:ss WW');格式化当前时间 
	返回  "2017-12-12 10:25:10 星期五"
//	Moment()里面可以传入时间 Moment("2017-12-19").format('YYYY-MM-DD hh:mm:ss WW') 
    格式化传入时间
```



