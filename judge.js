/**
 * Created by trigkit4 on 16/1/17.
 * judge.js <https://github.com/hawx1993/judge>
 * @author trigkit4 <trigkit@163.com>
 */
;(function (root,factory) {
    //support requirejs && amd
    if(typeof define === 'function' && define.amd){
        define(function () {
            return judge = factory();
        });
        //Commonjs
    }else if(typeof exports === 'object'){
        module.exports = factory();
    }else{
        root.judge = factory();
    }
}(this, function (root) {
    root = this || global;
    var judge = {},
        ua = navigator.userAgent.toLowerCase(),
        op = Object.prototype,
        oString = op.toString;

    judge = (function () {
        return {
            version: '0.1.2',
            type: function (obj) {
            return Object.prototype.toString.call(obj)
                .replace(/^\[object (.+)\]$/, "$1")
                .toLowerCase();
            },
            array : function (value) {
                return  oString.call(value) === '[object Array]';
            },
            include : function(str,substr){
                return str.indexOf(substr) > -1;
            },
            isWeiXin: function(){
                return !!ua.match(/MicroMessager/i) ? 'micromessager':'false';
            },
            kernel: function(){
                if(/gecko\/\d/i.test(ua)){
                        return 'gecko';
                  }else if(/webkit\//.test(ua)){
                      return 'webkit'
                  }else if(/MSIE\d/.test(ua)){
                      return 'IE';
                  }else if(/edge/i.test(ua)){
                       return 'edge';
                  }
            },
            platform : function(){
                if(ua.match(/ipad/i) === 'ipad') {
                    return 'ipad';
                }else if(/android/i.test(ua)){
                    return 'Android';
                }else if(ua.match(/(iPhone\sOS)\s([\d_]+)/i)){
                    return 'iPhone';
                }else if(ua.match(/windows mobile/i)== 'windows mlbile'){
                    return 'windows phone'
                }else if(ua.match(/Mac os X/i)){
                    return 'Mac os X';
                }else if(ua.match(/Window/i)){
                    return 'Windows';
                }else if(ua.match(/Linux/i)){
                    return 'Linux';
                }else if(ua.match(/\sQQ/i) =='qq'){
                    return 'qq'
                }else if(ua.match(/blackberry/i || /BB10/i)){
                    return 'blackberry';
                }
            },
            //judge value isexist?
            isExist : function(value){
                return value !== null && value !== undefined;
            },
            isInt: function(num){
                return Math.round(num) === num;
            },
            isOnline: function(){
                return navigator.onLine;
            },
            inArray: function(val,arr){
                if(!judge.array(arr)){
                    return false;
                }
                for(var i = 0;i<arr.length;i++){
                    if(arr[i] == val){
                        return true;
                    }
                }
                return false;
            },
            isTouchDevice: function(){
                return 'ontouchstart' in window ||
                    'DocumentTouch' in window && document instanceof DocumentTouch;
            },
            isEmail: function(em){
                return em.match(/^(([0-9a-zA-Z]+)|([0-9a-zA-Z]+ [_.0-9a-zA-Z-]*))@([a-zA-Z0-9-]+[.])+([a-zA-Z])/) ? true : false;
            },
            hasLowerCase: function(str){
                return str.match(/^.*[a-z]+.*$/) ? true : false;
            },
            hasNumber: function(num){
                return num.match(/^.*[0-9]+.*$/) ? true : false;
            },
            hasCaptial: function (str) {
                return str.match(/^.*[A-Z]+.*$/) ? true : false;
            },
            isBrowser: function(){
                return !!(typeof window !== 'undefined' && navigator !== 'undefined' && window.document);
            },
            isFunction: function (fn) {
                return oString.call(fn) === ['object Function'];
            },
            isEqual: function (val1, val2) {
                return val1 === val2;
            },
            size: function(val){
                return val.length;
            },
            isHttps: function(){
                return location.protocol.indexOf('https') > -1;
            },
            //judge a given array's elements is unique or not
            isUnique: function(array){
                if(array == '') return [];
                var arr = array.sort();
                for(var i = 0;i < array.length;i++){
                    if(arr[i] === arr[i+1]){
                        return false;
                    }
                }
                return true;
            },
            isString: function(str){
                return judge.type(str) === 'string';
            },
            isObject: function(obj){
                return judge.type(obj) === 'object';
            },
            hasClass: function(element,className){
                if(element.classList)
                    element.classList.contains(className);
                else
                    new RegExp('(^| )' + className + '( |$)','gi').test(element.className)
            },
            isError: function(value){
                return oString.call(value) === ['object Error'];
            },
            isChar: function(value){
                return judge.isString(value) && value.length === 1;
            },
            isEmpty: function(value){
                if(judge.array(value) || judge.isString(value)){
                    return (value.length <= 0);
                }else if(judge.type(value)=== null || judge.type(value) === undefined){
                    return true;
                }else if(judge.type(value) === 'number'){
                    return false;
                }else if(judge.isObject(value)){
                    for(var key in value){
                        if(value.hasOwnProperty(key)) return false;
                    }
                    return true;
                }
                return true;
            },
            isQQ: function(qq){
                var req = new RegExp(/^[1-9][0-9]{4,9}$/).test(qq);
                return !!req;
            },
            isPhoneNum: function(num){
                var phone = new RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/).test(num);
                return !!phone;
            },
            isIncludeChinese: function(ch){
                return !!/[\u4e00-\u9fa5]/g.test(ch);
            },
            onlyChinese: function(ch){
                var myReg =/^[\u4e00-\u9fa5]{0,}$/;
                return !!myReg.test(ch);
            },
            isElement: function(element){
                return typeof HTMLElement !== 'undefined' ? function (element) {
                    return (element instanceof HTMLElement);
                } :
                    function (element) {
                        return !!(element && element.nodeType === 1);
                    }
            }(),
            //judge a given value is being null or undefined
            isSet: function(value){
                return value !== null && value !== (void 0)
            },
            isRegExp: function(reg){
                return judge.type(reg) === 'regexp';
            },
            //judge your ID number  true or false
            isIdNumber: function(num){
                return (/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num));
            },
            isEven: function(num){
                return (num % 2 === 0);
            },
            isOdd: function (num) {
                return (num % 2 === 1)
            },
            assert: function (value, desc) {
                document.write("<style>#results li.pass{ color: green;}#results li.fail{ color: red;}</style>");
                document.write("<ul id='results'></ul>");
                var results;
                results = results || document.getElementById('results');
                var li = document.createElement('li');
                li.className = value ? "pass" : "fail";
                li.appendChild(document.createTextNode(desc));
                results.appendChild(li);
                if(!value){
                    li.parentNode.parentNode.className = "fail";
                }
                return li;
            }
        }
    })();
    return judge;
}));













