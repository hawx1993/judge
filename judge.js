/**
 * Created by trigkit4 on 16/1/17.
 */
;(function (root,factory) {
    //support requirejs && amd
    if(typeof define === 'function' && define.amd){
        define(function () {
            return judge;
        });
        //Commonjs
    }else if(typeof exports === 'object'){
        module.exports = factory();
    }else{
        root.judge = factory();
    }
}(this, function (root) {
    root = this || global;
    var judge = {},ua = navigator.userAgent.toLowerCase();

    var op = Object.prototype,
        oString = op.toString,
        hasOwn = op.hasOwnProperty,
        ap = Array.prototype;
    judge.is = {};
    judge.version = '0.1.0';

    judge.array = Array.isArray || function (value) {
            return oString.call(value) === '[object Array]';
        };
    //judge is str include substr
    judge.include = function (str,substr) {
        return str.indexOf(substr) > -1;
    };
    judge.isWeiXin = function () {
        var ua = window.navigator.userAgent.toLowerCase();
        //micromessager 微信中的浏览器名称
        return !!ua.match(/MicroMessager/i) ? 'miccromessager':'false'
    };
    judge.kernel = function () {
        if(/gecko\/\d/i.test(ua)){
            return 'gecko';
        }else if(/webkit\//.test(ua)){
            return 'webkit'
        }else if(/MSIE\d/.test(ua)){
            return 'IE';
        }else if(/edge/i.test(ua)){
            return 'edge';
        }
    };
    judge.platform = function () {
        if(ua.match(/ipad/i) === 'ipad') {
            return 'ipad';
        }else if(ua.match(/(Android);?[\s\/]+([\d.]+)?/i)){
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
    };
    //judge value isexist?
    judge.isExist = function (value) {
        return value !== null && value !== undefined;
    };

    judge.isInt = function (value) {
        return Math.round(value) === value;
    };
    judge.isOnline = function () {
        return navigator.onLine;
    };
    judge.inArray = function (val,arr) {
        if(!judge.array(arr)){
            return false;
        }
        for(var i = 0;i<arr.length;i++){
            if(arr[i] == val){
                return true;
            }
        }
        return false;
    };
    judge.isTouchDevice = function () {
        return 'ontouchstart' in window ||
            'DocumentTouch' in window && document instanceof DocumentTouch;
    };
    judge.isEmail = function (em) {
        return em.match(/^(([0-9a-zA-Z]+)|([0-9a-zA-Z]+ [_.0-9a-zA-Z-]*))@([a-zA-Z0-9-]+[.])+([a-zA-Z])/) ? true : false;
    };
    judge.hasLowerCase = function (str) {
        return str.match(/^.*[a-z]+.*$/) ? true : false;
    };
    judge.hasNumber = function (num) {
        return num.match(/^.*[0-9]+.*$/) ? true : false;
    };
    judge.hasCaptial = function (str) {
        return str.match(/^.*[A-Z]+.*$/) ? true : false;
    };
    judge.isBrowser = function () {
        return !!(typeof window !== 'undefined' && navigator !== 'undefined' && window.document);
    };
    judge.isFunction = function (fn) {
        return oString.call(fn) === ['object Function'];
    };
    judge.isEqual = function (val1, val2) {
        return val1 === val2;
    };
    judge.size = function (val) {
        return val.length;
    };
    judge.isHttps = function () {
        return location.protocol.indexOf('https') > -1;
    };
    //judge a given array's elements is unique or not
    judge.isUnique = function (array) {
        var arr = array.sort();
        for(var i = 0;i < array.length;i++){
            if(arr[i] == arr[i+1]){
                return false;
            }
        }
        return true;
    };
    judge.isString = function (str) {
        return judge.type(str) === 'string';
    };
    judge.isObject = function (obj) {
        return judge.type(obj) === 'object';
    };
    judge.type = function (obj) {
        return Object.prototype.toString.call(obj)
            .replace(/^\[object (.+)\]$/, "$1")
            .toLowerCase();
    };
    judge.hasClass = function (element) {
        if(element.classList)
            element.classList.contains(className);
        else
            new RegExp('(^| )' + className + '( |$)','gi').test(element.className)
    };
    judge.isError = function (value) {
        return oString.call(value) === ['object Error'];
    };
    judge.isChar = function (value) {
        return judge.isString(value) && value.length === 1;
    };
    //jude a given value is empty or not
    judge.isEmpty = function (value) {
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
    };

    return judge;
}));













