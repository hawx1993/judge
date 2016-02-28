
/**
 * Created by trigkit4 on 16/1/17.
 * judge.js <https://github.com/hawx1993/judge>
 * @author trigkit4 <trigkit@163.com>
 */
//var device = require('./dev');
(function (root,factory) {
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
    var judge = {},
        op = Object.prototype,
        oString = op.toString;

    //support Node.js module
    if(typeof window !== 'undefined'){
        var ua = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
    }

    judge = (function () {
        return {
            version: '0.4.8',
            type: function (obj) {
                return Object.prototype.toString.call(obj)
                    .replace(/^\[object (.+)\]$/, "$1")
                    .toLowerCase();
            },
            isArray : function (value) {
                return  oString.call(value) === '[object Array]';
            },
            include : function(str,substr){
                return str.indexOf(substr) > -1;
            },
            kernel: function(){
                if(/gecko\/\d/.test(ua)){
                    return 'Gecko';
                }else if(/edge/i.test(ua)){
                    return 'Edge';
                } else if(/webkit\//.test(ua)){
                    return 'Webkit'
                }else if(/msie/.test(ua) || "ActiveXObject" in window){
                    return 'Trident';
                }else if(ua.indexOf('Presto') > -1){
                    return "Opera";
                }
                return 'Unknow kernel'
            },
            platform : function(){
                var iPad = ua.match(/ipad/),
                    //貌似wp平台有伪造ua为安卓
                    Android = ua.match(/android/) && !ua.match(/windows phone/),
                    iOS = ua.match(/iphone/),
                    WinPhone = ua.match(/windows phone/),
                    Mac = ua.match(/mac os x/),
                    Windows = ua.match(/window/),
                    Linux = ua.match(/linux/),
                    Blackberry = ua.match(/blackberry/),
                    AndroidTablet = /android/.test(ua) && !/mobile/.test(ua);
                var device =[
                    iPad,Android,iOS,WinPhone,Mac,Windows,Linux,Blackberry,AndroidTablet
                ];
                var dn = [
                    "iPad","android","ios","windowsPhone","mac","windows","linux","blackBerry","androidTablet"
                ];
                for(var k =0;k<device.length;k++){
                    if(device[k]){
                        return dn[k];
                    }
                }
                return "Unknow Platform";
            },
            iosDevice: function () {
                var iPhone4 = ua.match(/iphone/i) && window.screen.height ==480,
                    iPhone5 = ua.match(/iphone/i) && window.screen.height>480
                        && window.screen.height <667,
                    iPhone6 = ua.match(/iphone/i) && window.screen.height>480
                        && window.screen.height<736,
                    iPhone6P = ua.match(/iphone/i) && window.devicePixelRatio==3.0
                        &&window.screen.height==736;

                var device = [
                    iPhone4,iPhone5,iPhone6,iPhone6P
                ];
                dn = ["iPhone4","iPhone5","iPhone6","iPhone6Plus"];
                for(var j = 0,l=device.length;j<l;j++){
                    if(device[j]){
                        return dn[j];
                    }
                }
                return "Unknow iosDevice";
            },
            androidDevice: function () {
                //HM NOTE 1s ->navigator.appVersion
                if(ua.match(/android/i)){
                    var mi4 = ua.indexOf('mi 4');
                    mi4 = ua.substr(mi4 , 4).toUpperCase();
                    return mi4;
                } else{
                    return "Unknow AndroidDevice";
                }
            },
            iosVersion: function () {
                if(ua.match(/iPhone/i)){
                    os = ua.indexOf('os');
                }
                iosVersion = ua.substr(os + 3, 5).replace('_','.').replace('_','.');
                return iosVersion;
            },
            androidVersion: function () {
                var match = ua.match(/android\s([0-9\.]*)/i);
                return match ? match[1] : false;
            },
            isMobile: function () {
                return !!ua.match(/(iPhone|iPod|Android|ios|iPad|windows phone|tablet)/i);
            },
            isPc: function () {
                return !judge.isMobile();
            },
            //judge value isexist?
            isExist: function(value){
                return value !== null && value !== undefined && value !== '';
            },
            inArray: function(val,arr){
                if(!judge.isArray(arr)){
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
            email: function(em){
                return !!em.match(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/);
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
                return !!(typeof window !== 'undefined' && navigator !== 'undefined' && window.document);
            },
            isFunction: function (fn) {
                return judge.type(fn) === 'function';
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
                return judge.isString(value) && value.length === 1;
            },
            isEmpty: function(value){
                if(judge.isArray(value) || judge.isString(value)){
                    return (value.length <= 0);
                }else if(judge.type(value)=== null || judge.type(value) === undefined){
                    return true;
                }else if(judge.type(value) === 'number'){
                    return false;
                }else if(judge.isObject(value)){
                    for(var key in value){
                        if(value.hasOwnProperty(key)) return false;
                    }
                }
                return true;
            },
            isQQ: function(qq){
                var req = new RegExp(/^[1-9][0-9]{4,9}$/).test(qq);
                return !!req;
            },
            phoneNumber: function(num){
                var phone = /^1[3|4|5|7|8]\d{9}$/.test(num);
                return !!phone;
            },
            telPhone: function (num) {
                var tel = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(num);
                return !!tel;
            },
            includeChinese: function(ch){
                return !!/[\u4e00-\u9fa5]/g.test(ch);
            },
            onlyChinese: function(ch){
                var myReg =/^[\u4e00-\u9fa5]{0,}$/;
                return !!myReg.test(ch);
            },
            onlyNumber: function (num) {
                num = /^\d+$/g.test(num);
                return num;
            },
            isElement: function(ele){
                return !!(ele && ele.nodeType === 1);
            },
            //judge a given value is being null or undefined
            isSet: function(value){
                return value !== null && value !== (void 0)
            },
            isRegExp: function(reg){
                return judge.type(reg) === 'regexp';
            },
            //judge your ID number  true or false
            idNumber: function(num){
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
            },
            hasHash: function (url) {
                url = url || window.location.href;
                var match = url.match(/#(.*)$/);
                var ends =  match ? match[1] : '';
                return (ends !== '') ;
            },
            //judge obj has contain the given key
            has: function (obj,key) {
                return obj != null && hasOwnProperty.call(obj,key);
            },
            isUrl: function (url) {
                var re = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;
                return re.test(url);
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
                    //IE版本号判断，IE6~IE10
                    MSIE = ua.indexOf('msie'),
                    //IE11+
                    trident = ua.indexOf('trident/'),
                    IEMobile = /iemobile/.test(ua),
                    MobileIEVersion = "isMobileIE"+parseInt(ua.substring(MSIE + 5,ua.indexOf(".",MSIE))),
                    isFirefox = /firefox/.test(ua),
                    isIosChrome = ((/iphone/.test(ua)) || /ipad/.test(ua)) && ua.match(/crios/) == 'crios',
                    isIpadSafari = /ipad/.test(ua) && /safari/.test(ua),
                    isEdge = /edge/.test(ua),
                    isSougou= /metasr/.test(ua),
                    isLiebao= /lbbrowser/.test(ua),
                    isLiebaoMobile= /liebaofast/.test(ua),
                    //判断是否来自微信平台的浏览器
                    isWeiXin= /micromessenger/.test(ua),
                    isUC= /ubrowser/.test(ua) && !/bidubrowser/.test(ua)&&!/baidubrowser/.test(ua),
                    isUCMobile= /ucbrowser/.test(ua),
                    isBaidu= /bidubrowser/.test(ua),
                    isBaiduMobile= /baidubrowser/.test(ua),
                    isQQMobile= /qqbrowser/.test(ua) &&judge.isMobile(),
                    isQQBrowser= /qqbrowser/.test(ua),
                    isOpera= /opr/.test(ua),
                    isMiuiBrowser= /miuibrowser/.test(ua),
                    isOppoBrowser= /oppobrowser/.test(ua),
                    isAndroidChrome = /android/.test(ua) && /chrome/.test(ua),
                    isChrome = /chrome/.test(ua),
                    isIosSafari = /iphone/.test(ua) && /safari/.test(ua),
                    isSafari = /safari/.test(ua) && ua.indexOf('chrome') < 1;
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
                    //有参数
                    if(browsers[i] && arguments[0]==bn[i]){
                        return browsers[i];
                    //无参数
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
                }else if(trident > 0 && /rv/.test(ua)){
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
            }
        };
    })();
    return judge;
}));
