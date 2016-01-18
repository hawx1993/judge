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


    return judge;
}));













