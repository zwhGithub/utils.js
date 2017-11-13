//设置cook
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
//设置类名
hasClass(obj, classStr) {
    if (obj.className && this.trim(obj.className, 1) !== "") {
        let arr = obj.className.split(/\s+/); //这个正则表达式是因为class可以有多个,判断是否包含
        return (arr.indexOf(classStr) === -1) ? false : true;
    } else {
        return false;
    }

}
//添加类名
addClass(obj, classStr) {
    if ((this.istype(obj, 'array') || this.istype(obj, 'elements')) && obj.length >= 1) {
        for (let i = 0, len = obj.length; i < len; i++) {
            if (!this.hasClass(obj[i], classStr)) {
                obj[i].className += " " + classStr;
            }
        }
    } else {
        if (!this.hasClass(obj, classStr)) {
            obj.className += " " + classStr;
        }
    }
}
//删除类名
removeClass(obj, classStr) {
    if ((this.istype(obj, 'array') || this.istype(obj, 'elements')) && obj.length > 1) {
        for (let i = 0, len = obj.length; i < len; i++) {
            if (this.hasClass(obj[i], classStr)) {
                let reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
                obj[i].className = obj[i].className.replace(reg, '');
            }
        }
    } else {
        if (this.hasClass(obj, classStr)) {
            let reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
            obj.className = obj.className.replace(reg, '');
        }
    }
}
