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

数组去重
*/
function uniq(array) {
    var temp = [];
    var l = array.length;
    for (var i = 0; i < l; i++) {
        console.log(12312312, i)
        for (var j = i + 1; j < l; j++) {
            if (array[i] === array[j]) {
                i++;
                // j = i;
            }
        }
        temp.push(array[i]);
    }
    return temp;
}

let arr = [1,2,3,3,1,2];
console.log(arr);
let set = new Set(arr);
arr = Array.from(set);
console.log(arr);
/*

*/
