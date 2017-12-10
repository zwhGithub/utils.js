let preventPageScroll = e => e.preventDefault();

export default {
  prevent() {
    //禁止滑动
    document.addEventListener('touchmove', preventPageScroll, false);
  },
  recover() {
    document.removeEventListener('touchmove', preventPageScroll, false);
  }
};

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
