

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

/**
时间格式化
**/

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

