/**
 * Created by trigkit4 on 16/1/17.
 * judge.js < https://github.com/hawx1993/judge >
 * @author trigkit4 <trigkit@163.com>
 */
;(function (root,factory) {
    //support requirejs && amd
    if(typeof define === 'function' && define.amd){
        define(function () {
            return judge = factory();
        });
        //CommonJS
    }else if(typeof exports === 'object'){
        module.exports = factory();
    }else{
        root.judge = factory();
    }
}(this, function (root) {
    root = this || global;
    'use strict';
    var judge = {},
        op = Object.prototype,
        oString = op.toString,
        funcTo = Function.prototype.toString;
    var reg = {
        email: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
        id:/(^\d{15}$)|(^\d{17}([0-9]|X)$)/i,
        qq:/^[1-9][0-9]{4,9}$/,
        phone:/^1[3|4|5|7|8]\d{9}$/,
        nativeFn:/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
        url: /^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/
    };
    //support Node.js module
    if(typeof window !== 'undefined'){
        var ua = 'navigator' in window && 'userAgent' in navigator &&
            navigator.userAgent.toLowerCase() || '';
        var vendor = 'vendor' in navigator && navigator.vendor.toLowerCase();
    }

    judge = (function () {
        return {
            version: '0.9.0',
            /**
             * return {array,object,number,string,null,undefined,function,boolean}
             */
            type: function (obj) {
                return oString.call(obj).replace(/^\[object (.+)\]$/, "$1").toLowerCase();
            },
            /**
             * Each iframe has their own window object
             */
            isWindow: function (obj) {
                return obj != null && obj === obj.window;
            },
            isDocument: function (obj) {
                if(!obj) return false;
                var body = obj.body;
                if(typeof body == 'undefined') return false;
                try{
                    obj.body = null;
                    obj.body = body;
                    return false;
                }catch(e){
                    return true;
                }
            },
            /**
             * Array.isArray() don't support IE8 or older
             */
            isArray : function (value) {
                return  typeof value ==='object' &&
                    oString.call(value) === '[object Array]';
            },
            isObject: function(obj){
                return $.type(obj) == 'object';
            },
            isObjectLike: function (value) {
                return !!value && typeof value == 'object';
            },
            isEmptyObject: function (obj) {
                var k;
                for(k in obj){
                    return false;
                }
                return true;
            },
            /**
             * judge obj is plain object,created by {} or new Object
             */
            isPlainObject: function (obj) {
                return $.isObject(obj) && !$.isWindow(obj) && Object.getPrototypeOf(obj) == op;
            },
            include: function(str,substr){
                return str.indexOf(substr) > -1;
            },
            /**
             *  Array,Arguments,NodeList and have Non-Negative Integer length property Object.
             *
             *  $.isArrayLike(document.body.className)//=>true
             */
            isArrayLike: function ( obj ) {
                if( obj != null ){
                    var length = obj.length,type = $.type( obj );
                }else return false;
                if($.isWindow( obj )){
                    return false;
                }
                if(obj.nodeType === 1 && length){
                    return true;
                }
                return type === "array" || type !== "function" && ( length === 0 ||
                    typeof length === "number" && length > 0 && ( length - 1 ) in obj );
            },
            /**
             *  like isArrayLike,except it also check if 'value' is object
             *  $.isArrayLikeObject('abcd');//false
             */
            isArrayLikeObject: function (value) {
                return $.isObjectLike(value) && $.isArrayLike(value);
            },
            /**
             * @returns
             *   [gecko: 'firefox',edge: 'edge',webkit: 'chrome',trident: 'IE',presto: 'opera']
             */
            kernel: function(){
                if(/gecko\/\d/.test(ua)){
                    return 'gecko';
                }else if(/edge/i.test(ua)){
                    return 'edge';
                } else if(/webkit\//.test(ua)){
                    return 'webkit'
                }else if(/msie/.test(ua) || "ActiveXObject" in window || /trident/.test(ua)){
                    return 'trident';
                }else if(/presto/.test(ua)){
                    return "opera";
                }
                return 'unknow'
            },
            /**
             * case sensitive
             * @returns
             * ["iPad","android","ios","windowsPhone","mac",
             * "windows","linux","blackBerry","androidTablet"]
             */
            platform : function(){
                var iPad = ua.match(/ipad/),
                //some wp platform fake ua to android
                    Android = ua.match(/android/) && !ua.match(/windows phone/),
                    iOS = ua.match(/iphone/),
                    WinPhone = ua.match(/windows phone/),
                    Mac = ua.match(/mac os x/),
                    Windows = ua.match(/window/),
                    Linux = ua.match(/linux/),
                    Blackberry = ua.match(/blackberry/),
                    Tablet = /ipad|android(?!.*mobile)/i.test(ua),
                    AndroidTablet = /android/.test(ua) && !/mobile/.test(ua);
                var device =[
                    iPad,Android,iOS,WinPhone,Mac,Windows,Linux,Blackberry,Tablet,AndroidTablet
                ];
                var arrDevice = [
                    "iPad","android","ios","windowsPhone","mac","windows",
                    "linux","blackBerry","tablet","androidTablet"
                ];
                for(var k =0;k<device.length;k++){
                    if(device[k]){
                        return arrDevice[k];
                    }
                }
                return "unknow";
            },
            /**
             * @returns ["iPhone4","iPhone5","iPhone6","iPhone6Plus"]
             */
            iosDevice: function () {
                var reg = ua.match(/iphone/);
                var iPhone4 = reg && window.screen.height ==480,
                    iPhone5 = reg && window.screen.height>480
                        && window.screen.height <667,
                    iPhone6 = reg && window.screen.height>480
                        && window.screen.height<736,
                    iPhone6P = reg && window.devicePixelRatio==3.0 && window.screen.height==736;

                var device = [
                    iPhone4,iPhone5,iPhone6,iPhone6P
                ];
                var arrDevice = ["iPhone4","iPhone5","iPhone6","iPhone6Plus"];
                for(var j = 0,l=device.length;j<l;j++){
                    if(device[j]){
                        return arrDevice[j];
                    }
                }
                return "unknow";
            },
            /**
             * @returns ['mx5','mi4','mz-metal','mx3',unknow]
             */
            androidDevice: function () {
                //HM NOTE 1s ->navigator.appVersion
                if(ua.match(/mx5/)){
                    return 'mx5'
                }
                if(ua.match(/mi 4/)){
                    return 'mi4'
                }
                if(ua.match(/metal/)){
                    return 'mz-metal'
                }
                if(ua.match(/m3/)){
                    return 'mx3'
                }
                else return 'unknow';
            },
            iosVersion: function () {
                if($.platform() !== 'ios') return 'unknow';
                if(ua.match(/iPhone/i)){
                    var os = ua.indexOf('os');
                }
                return ua.substr(os + 3, 5).replace('_','.');
            },
            androidVersion: function () {
                var match = ua.match(/android\s([0-9\.]*)/i);
                return match ? "android" + " "+match[1] : 'unknow';
            },
            isMobile: function () {
                return !!ua.match(/(iPhone|iPod|android|ios|iPad|windows phone|tablet)/i);
            },
            isPc: function () {
                return !$.isMobile();
            },
            isExist: function(value){
                return value !== null && value !== undefined && value !== '';
            },
            isNull: function (value) {
                return value == null;
            },
            isUndefined: function (value) {
                return value === undefined;
            },
            isNumber: function (num) {
                return $.type(num) === 'number';
            },
            lt: function (val1,val2) {
                return val1 < val2;
            },
            inArray: function(val,arr){
                if(!$.isArray(arr)) return false;
                for(var i = 0;i<arr.length;i++){
                    if(arr[i] == val){
                        return true;
                    }
                }
                return false;
            },
            isTouchDevice: function(){
                return 'ontouchstart' in root ||
                    'DocumentTouch' in root && document instanceof DocumentTouch;
            },
            email: function(num){
                return reg.email.test(num);
            },
            hasLowerCase: function(str){
                return !!str.match(/^.*[a-z]+.*$/);
            },
            hasNumber: function(num){
                return !!num.match(/^.*[0-9]+.*$/);
            },
            hasCapital: function (str) {
                return !!str.match(/^.*[A-Z]+.*$/);
            },
            isBrowser: function(){
                return !!(typeof root !== 'undefined' &&
                    navigator !== 'undefined' && root.document
                );
            },
            isFunction: function (fn) {
                return $.type(fn) === 'function';
            },
            isEqual: function (val1, val2) {
                return val1 === val2;
            },
            /**
             *  $.isLength('1');//false
             */
            isLength: function (value) {
                return typeof value == 'number' && value > -1 &&
                    value % 1 ==0 && value <= Number.MAX_SAFE_INTEGER;
            },
            size: function(val){
                return val.length;
            },
            isHttps: function(url){
                return location.protocol.indexOf('https') > -1 ||
                    url.toLowerCase().indexOf('https') > -1;
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
                return $.type(str) === 'string';
            },
            isInt: function(num){
                return Math.round(num) === num;
            },
            isJson : function (json){
                return typeof json == 'object' && JSON.stringify(json).indexOf('{') == 0;
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
                return $.isString(value) && value.length === 1;
            },
            /**
             * @examples
             *  judge.isArguments(function(){ return arguments;}());//true
             */
            isArguments: function (value) {
                var args = '[object Arguments]';
                return $.isArrayLikeObject(value) && hasOwnProperty.call(value,'callee') &&
                    (!propertyIsEnumerable.call(value,'callee') || oString.call(value)== args);
            },
            /**
             * judge.isEmpty(null);//true
             */
            isEmpty: function(value){
                if($.isArray(value) || $.isString(value)){
                    return (value.length <= 0);
                }else if($.type(value)=== null || $.type(value) === undefined){
                    return true;
                }else if($.type(value) === 'number'){
                    return false;
                }else if($.isObject(value)){
                    for(var key in value){
                        if(value.hasOwnProperty(key)) return false;
                    }
                }
                return true;
            },
            qqNumber: function(num){
                return reg.qq.test(num);
            },
            phoneNumber: function(num){
                return reg.phone.test(num);
            },
            isLetter: function (str) {
                if("" == str) return false;
                var l = /^[A-Za-z]+$/;
                return l.test(str);

            },
            isAlpha: function (str) {
                var alp = /^[a-zA-Z0-9_]{1,}$/;
                return alp.test(str);
            },
            includeChinese: function(ch){
                return /[\u4e00-\u9fa5]/g.test(ch);
            },
            onlyChinese: function(ch){
                var myReg =/^[\u4e00-\u9fa5]{0,}$/;
                return myReg.test(ch);
            },
            onlyNumber: function (num) {
                return /^\d+$/g.test(num);
            },
            /**
             *  judge obj is Dom elements.
             */
            isElement: function(obj){
                return $.isObject(obj) && obj.nodeType > 0;
            },
            //judge a given value is being null or undefined
            isSet: function(value){
                return value !== null && value !== (void 0)
            },
            isRegExp: function(reg){
                return $.type(reg) === 'regexp';
            },
            //judge your ID number ,case-insensitive
            idNumber: function(num){
                return (reg.id.test(num));
            },
            isEven: function(num){
                return num!==null && (num % 2 ===0);
            },
            isOdd: function (num) {
                return (num % 2 === 1)
            },
            min: function (a,b) {
                if(a<b)
                    return a;
                return b;
            },
            assert: function (value, desc) {
                document.write(
                    "<style>" +
                    "ul{padding:0}"+
                    "li{list-style: none};" +
                    "#results li.pass{ color: green;}" +
                    "li.pass:before{content:'✓';color: green;padding-right:10px} " +
                    "li.fail:before{content: '✘';color:red;padding-right:10px}+" +
                    "</style>");
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
                return '';
            },
            hasHash: function (url) {
                url = url || window.location.href;
                var match = url.match(/#(.*)$/);
                var ends =  match ? match[1] : '';
                return (ends !== '');
            },
            getHash: function (url) {
                url = url || window.location.href;
                var match = url.match(/#(.*)$/);
                return match ? match[1] : '';
            },
            //judge obj has contain the given key
            has: function (obj,key) {
                return obj != null && hasOwnProperty.call(obj,key);
            },

            zipCode: function (code) {
                var reg = new RegExp(/[1-9]\d{5}(?!\d)/);
                return reg.test(code);
            },
            isChromium: function () {
                var chromium = "mozilla/&&applewebkit/&&chrome/&&safari/".split("&&");
                for (var i = 0; i < chromium.length; i++)
                    if (ua.indexOf(chromium[i]) < 0)
                        return false;
                return true;
            },
            isOnline: function () {
                return navigator.onLine;
            },
            hasSpecialChar: function(str){
                var pattern = str.match(/[^A-Za-z0-9\u4e00-\u9fa5]/);
                return !!pattern;
            },
            browser: function () {
                var
                    //judge IE version ，IE6~IE10
                    MSIE = ua.indexOf('msie'),
                    //IE11+
                    trident = ua.indexOf('trident/'),
                    IEMobile = /iemobile/.test(ua),
                    MobileIEVersion = "isMobileIE"+parseInt(ua.substring(MSIE + 5,ua.indexOf(".",MSIE))),
                    isFirefox = /firefox/.test(ua),
                    isIosChrome = ((/iphone/.test(ua)) || /ipad/.test(ua)) &&
                        ua.match(/crios/) == 'crios',
                    isIpadSafari = /ipad/.test(ua) && /safari/.test(ua),
                    isEdge = /edge/.test(ua),
                    isSougou= /metasr/.test(ua),
                    isLiebao= /lbbrowser/.test(ua),
                    isLiebaoMobile= /liebaofast/.test(ua),
                    //judge is weixin's built-in browser or not
                    isWeiXin= /micromessenger/.test(ua),
                    isUC= /ubrowser/.test(ua) && !/bidubrowser/.test(ua)&&
                        !/baidubrowser/.test(ua),
                    isUCMobile= /ucbrowser/.test(ua),
                    isBaidu= /bidubrowser/.test(ua),
                    isBaiduMobile= /baidubrowser/.test(ua) || /baiduboxapp/.test(ua),
                    isQQMobile= /qqbrowser/.test(ua) && $.isMobile(),
                    isQQBrowser= /qqbrowser/.test(ua) && $.isPc(),
                    isOpera= /opr/.test(ua),
                    isMiuiBrowser= /miuibrowser/.test(ua),
                    isOppoBrowser= /oppobrowser/.test(ua),
                    isAndroidChrome = /android/.test(ua) && /chrome/.test(ua),
                    isChrome = /chrome|chromium/i.test(ua) &&
                        /google inc/.test(vendor) && $.isPc(),
                    isIosSafari = /iphone/.test(ua) && /safari/.test(ua),
                    isSafari = /webkit\W(?!.*chrome).*safari\W/i.test(ua) && $.isPc();
                var browsers = [
                    isFirefox,isIosChrome, isIpadSafari,isEdge,isSougou,isLiebao,
                    isLiebaoMobile,isWeiXin,isUC, isUCMobile,isBaidu,isBaiduMobile,
                    isQQMobile,isQQBrowser,isOpera, isMiuiBrowser,isOppoBrowser,
                    isAndroidChrome,isChrome,isIosSafari,isSafari
                ];
                var bn = [
                    "isFirefox","isIosChrome","isIpadSafari", "isEdge", "isSougou","isLiebao",
                    "isLiebaoMobile","isWeiXin","isUC", "isUCMobile", "isBaidu",
                    "isBaiduMobile", "isQQMobile","isQQBrowser", "isOpera", "isMiuiBrowser",
                    "isOppoBrowser","isAndroidChrome","isChrome","isIosSafari","isSafari"
                ];
                for(var i =0;i < bn.length;i++){
                    //have params
                    if(browsers[i] && arguments[0]==bn[i]){
                        return browsers[i];
                        //without params
                    }else if(!arguments[0] && browsers[i]){
                        return bn[i].substring(2);
                    }
                }
                //IE10 or older
                if(MSIE > 0 && ua.match(/windows nt/)){
                    var iev = "isIE"+parseInt(ua.substring(MSIE + 5,ua.indexOf(".",MSIE)),10);
                    if(arguments[0] == iev){
                        return true;
                    }else if(!arguments[0] && iev){
                        return iev.substring(2)
                    }
                    //IE11
                }else if(/trident.*rv[ :]*11\./.test(ua)){
                    var rv = ua.indexOf('rv:');
                    var iee = "isIE"+parseInt(ua.substring(rv + 3,ua.indexOf('.',rv)),10);
                    if(arguments[0] ==iee){
                        return true;
                    }else if(!arguments[0] && iee){
                        return iee.substring(2);
                    }
                }else if(!arguments[0] && MSIE >0 && IEMobile){
                    return "Mobile IE"+parseInt(ua.substring(MSIE + 5,ua.indexOf(".",MSIE)));
                }else if(arguments[0]==MobileIEVersion){
                    return true;
                }
                if(arguments[0]=='isIE'){
                    return !!(window.ActiveXObject || "ActiveXObject" in window);
                }
                return false;
            },
            /**
             *   judge IE browser's version >= 8
             *   @params {boolean} true include IE8,false exclude IE8
             */
            isIE8Plus: function () {
                var $ = judge.browser;
                if(arguments[0]===true){
                    return $("isIE8") || $("isIE9") || $("isIE10") || $("isIE11");
                }
                if(arguments[0]===false){
                    return $("isIE9") || $("isIE10") || $("isIE11");
                }else{
                    return $("isIE8") || $("isIE9") || $("isIE10") || $("isIE11");
                }
            },
            /**
             *  judge DOM Element's position
             *  1.judge.position(element).top
             *  =>return element's position of the distance from the top
             *  2.judge.position(element,parent).left
             *  =>return the element's position of the distance to the left
             */
            position: function (element,parent) {
                var pos = element.getBoundingClientRect();
                var top = document.documentElement.clientTop;
                var left= document.documentElement.clientLeft;
                if(parent){
                    var l = element.offsetLeft,
                        t = element.offsetTop;
                    return {
                        left : l,
                        top : t
                    }
                }
                else  return{
                    top    :   pos.top - top,
                    left   :   pos.left - left
                }
            },
            /**
             *   judge value is native function or not
             *   @example
             *   judge.isNativeFunc(Object.assign);//true
             *   judge.isNativeFunc(judge.isFunction());//false
             */
            isNativeFn: function (fn) {
                var regChar = /[\\^$.*+?()[\]{}|]/g,
                //match  host constructor
                    isHostConstructor = /^\[object .+?Constructor\]$/,
                //judge value is a host object in IE9 or older
                    isHostObj = function (value) {
                        var result = false;
                        if(value != null && typeof value.toString != 'function'){
                            try {
                                result = !! (value + '');
                            }catch (e){}
                        }
                        return result;
                    };
                var isNative = new RegExp('^' +
                    funcTo.call(hasOwnProperty).replace(regChar,'\\$&').replace(reg.nativeFn, '$1.*?') + '$');
                if(fn == null||undefined){
                    return false;
                }
                if($.isFunction(fn)){
                    return isNative.test(funcTo.call(fn));
                }
                return $.isObjectLike(fn) &&
                    (isHostObj(fn) ? isNative: isHostConstructor).test(fn);
            },
            /**
             * @param str
             * $.strLength('前端');//=>2
             * $.strLength("frontEnd");//=>4
             */
            strLength: function (str) {
                return String(str).replace(/[^\x00-\xff]/g,'aa').length;
            },
            isLeapYear: function (year) {
                return !!(((year % 4) ==0) && ((year % 100) !==0) ||(year % 400) ==0 );
            },
            isDate: function (val) {
                return oString.call(val) === '[object Date]';
            },
            isUrl: function (str) {
                return!!str.match(reg.url);
            }
        };
    })();
    root.judge = judge;
    //if $ is undefined,point to judge
    root.$ === undefined && (root.$ = judge);

    return judge;
}));
