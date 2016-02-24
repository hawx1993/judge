
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
        op = Object.prototype,
        oString = op.toString;

    //support Node.js module
    if(typeof window !== 'undefined'){
        var ua = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
    }

    judge = (function () {
        return {
            version: '0.2.2',
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
            browser: function () {
                var IE6 = ua.indexOf("msie 6.0") > 0,
                    IE7 = ua.indexOf("msie 7.0") > 0,
                    IE8 = ua.indexOf("msie 8.0") >0 && !window.innerWidth,
                    IE9 = ua.indexOf("msie 9.0") > 0,
                    IE10 = ua.indexOf("msie 10.0") > 0,
                    IE11 = ua.indexOf("trident") > -1 && ua.indexOf('rv') >-1,
                    IE = !!window.ActiveXObject || "ActiveXObject" in window,
                    IEMobile = ua.match(/iemobile/),
                    Firefox = ua.indexOf("firefox") > -1,
                    Edge = ua.indexOf("edge") > -1,
                    Sougou = /metasr/.test(ua),
                    Liebao = ua.match(/lbbrowser/)=='lbbrowser',
                    lbmobile = ua.match(/liebaofast/),
                    //微信内置浏览器校验，qqbrowser的ua在micromessenger之前
                    Weixin = /micromessenger/.test(ua),
                    //兼容移动和PC端的UC浏览器，避免和百度浏览器匹配冲突
                    UC = ua.match(/ubrowser/)==='ubrowser',
                    mobileUC = ua.match(/ucbrowser/)=='ucbrowser',
                    //避免只匹配browser而引发的冲突
                    mobBaidu = ua.match(/baidubrowser/)=='baidubrowser',
                    MQQBrowser = ua.match(/qqbrowser/) && ua.match(/android/),
                    QQBrowser = ua.match(/qqbrowser/)=='qqbrowser',
                    Opera = ua.indexOf('opr') > -1,
                    //匹配mobile safari
                    mobileSafari = ua.match(/mobile safari/) == 'mobile safari'&& !ua.match(/android/),
                    MobileChrome = ua.match(/android/) && ua.match(/chrome/),
                    Chrome = ua.indexOf('chrome') > -1,
                    Safari = ua.match(/safari/i) && ua.indexOf('chrome') < 1;
                var browsers = [
                    IE6, IE7, IE8, IE9, IE10, IE11, IE, IEMobile,Firefox, Edge,Sougou,Liebao,lbmobile,Weixin,UC,mobileUC,mobBaidu,MQQBrowser,QQBrowser,Opera,mobileSafari,MobileChrome,Chrome,Safari
                ];
                var bn = [
                    "IE6","IE7","IE8", "IE9", "IE10", "IE11", "IE","Mobile IE", "Firefox", "Edge","Sougou","Liebao","Liebao Mobile","Weixin","UC","Mobile UC","Mobile Baidu","Mobile QQBrowser","QQBrowser","Opera","Mobile Safari","Mobile Chrome","Chrome", "Safari"
                ];
                for(var i = 0,l= browsers.length;i < l;i++){
                    if(browsers[i]){
                        return bn[i];
                    }
                }
                return "Unkonw Browser"
            },
            kernel: function(){
                if(/gecko\/\d/i.test(ua)){
                    return 'Gecko';
                }else if(/edge/i.test(ua)){
                    return 'Edge';
                } else if(/webkit\//.test(ua)){
                    return 'Webkit'
                }else if(/msie/i.test(ua) || "ActiveXObject" in window){
                    return 'Trident';
                }else if(ua.indexOf('Presto') > -1){
                    return "Opera";
                }
                return 'Unknow kernel'
            },
            platform : function(){
                var iPad = ua.match(/ipad/i),
                    Android = ua.match(/android/i),
                    iOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                    WinPhone = ua.match(/Windows Phone ([\d.]+)/),
                    Mac = ua.match(/Mac os X/i),
                    Windows = ua.match(/Window/i),
                    Linux = ua.match(/Linux/i),
                    Blackberry = ua.match(/Blackberry/i),
                    AndroidTablet = /android/i.test(ua) && !/mobile/i.test(ua);
                var device =[
                    iPad,Android,iOS,WinPhone,Mac,Windows,Linux,Blackberry,AndroidTablet
                ];
                var dn = [
                    "iPad","Android","iOS","WinPhone","Mac","Windows","Linux","Blackberry","AndroidTablet"
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
                dn = ["iPhone4","iPhone5","iPhone6","iPhone6P"];
                for(var j = 0,l=device.length;j<l;j++){
                    if(device[j]){
                        return dn[j];
                    }
                }
                return "Unknow iosDevice";
            },
            androidDevice: function () {
                if(ua.match(/android/i)){
                    var mi4 = ua.indexOf('mi 4');
                    mi4 = ua.substr(mi4 , 4).toUpperCase();
                    return mi4;
                }
                return "Unknow AndroidDevice";

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
                return !!ua.match(/(iPhone|iPod|Android|ios|iPad)/i);
            },
            isPc: function () {
                return !ua.match(/(iPhone|iPod|Android|ios|iPad)/i);
            },
            //judge value isexist?
            isExist: function(value){
                return value !== null && value !== undefined && value !== '';
            },
            isInt: function(num){
                return Math.round(num) === num;
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
                    return true;
                }
                return true;
            },
            isQQ: function(qq){
                var req = new RegExp(/^[1-9][0-9]{4,9}$/).test(qq);
                return !!req;
            },
            isPhoneNumber: function(num){
                var phone = /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/.test(num);
                return !!phone;
            },
            includeChinese: function(ch){
                return !!/[\u4e00-\u9fa5]/g.test(ch);
            },
            onlyChinese: function(ch){
                var myReg =/^[\u4e00-\u9fa5]{0,}$/;
                return !!myReg.test(ch);
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
                var re = new RegExp(/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i);
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
            }
        }
    })();
    return judge;

}));

