/**
 * Created by trigkit4 on 16/1/17.
 * judge.js < https://github.com/hawx1993/judge >
 * @author trigkit4 <trigkit@163.com>
 */
/// <reference path="types/index.d.ts" />

import { FnType } from "./types/judge";

(function (root, factory: Function) {
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
  let judge: FnType,
    op = Object.prototype,
    oString = op.toString,
    funcTo = Function.prototype.toString;
  const reg = {
    email: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
    id:/(^\d{15}$)|(^\d{17}([0-9]|X)$)/i,
    qq:/^[1-9][0-9]{4,9}$/,
    phone:/^1[3|4|5|7|8]\d{9}$/,
    nativeFn:/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
    url: /^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/
  };
  let ua;
  //support Node.js module
  if(typeof window !== 'undefined'){
    ua = 'navigator' in window && 'userAgent' in navigator &&
      navigator.userAgent.toLowerCase() || '';
  }

  judge = (function () {
    return {
      version: '1.0.4',
      /**
       * return {array,object,number,string,null,undefined,function,boolean}
       */
      type(obj: any): string {
        return oString.call(obj).replace(/^\[object (.+)\]$/, "$1").toLowerCase();
      },
      /**
       * Each iframe has their own window object
       */
      isWindow(obj): boolean {
        return obj != null && obj === obj.window;
      },
      isDocument (obj): boolean {
        if(!obj) return false;
        let body = obj.body;
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
      isArray(value: any): boolean {
        return  typeof value ==='object' &&
          oString.call(value) === '[object Array]';
      },
      isObject(obj: any): boolean{
        return $.type(obj) == 'object';
      },
      isObjectLike(value: any): boolean {
        return !!value && typeof value == 'object';
      },
      isEmptyObject(obj: any): boolean {
        // null and undefined are "empty"
        if (obj == null) return true;

        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj.length > 0)    return false;
        if (obj.length === 0)  return true;

        // If it isn't an object at this point
        // it is empty, but it can't be anything *but* empty
        // Is it empty?  Depends on your application.
        if (typeof obj !== "object") return true;

        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and valueOf enumeration bugs in IE < 9
        for (let key in obj) {
          if (Object.hasOwnProperty.call(obj, key)) return false;
        }

        return true;
      },
      /**
       * judge obj is plain object,created by {} or new Object
       */
      isPlainObject(obj: object): boolean {
        return $.isObject(obj) && !$.isWindow(obj) && Object.getPrototypeOf(obj) == op;
      },
      include(str: string, subStr: string): boolean{
        return str.indexOf(subStr) > -1;
      },
      /**
       *  Array,Arguments,NodeList and have Non-Negative Integer length property Object.
       *
       *  $.isArrayLike(document.body.className)//=>true
       */
      isArrayLike(obj: any): boolean {
        let length, type;
        if( obj != null ){
          length = obj.length, type = $.type( obj );
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
      isArrayLikeObject(value: object): boolean {
        return $.isObjectLike(value) && $.isArrayLike(value);
      },
      /**
       * @returns
       *   [gecko: 'firefox',edge: 'edge',webkit: 'chrome',trident: 'IE',presto: 'opera']
       */
      kernel(): string{
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
      platform(): string{
        const iPad = ua.match(/ipad/),// null or ['mac os x', index: 30, input: 'xx']
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
        const device =[
          iPad,Android,iOS,WinPhone,Mac,Windows,Linux,Blackberry,Tablet,AndroidTablet
        ];
        const arrDevice = [
          "iPad","android","ios","windowsPhone","mac","windows",
          "linux","blackBerry","tablet","androidTablet"
        ];
        for(let k = 0; k < device.length;k++){
          if(device[k]){
            return arrDevice[k];
          }
        }
        return "unknow";
      },
      /*
      * judge current user is in electron app or not
      * */
      isElectron(): boolean {
        return ua.indexOf('electron/') > -1
      },
      /**
       * @returns ["iPhone4","iPhone5","iPhone6","iPhone6Plus"]
       */
      iosDevice(): string {
        const reg = ua.match(/iphone/);
        const iPhone4 = reg && window.screen.height ==480,
          iPhone5 = reg && window.screen.height>480
            && window.screen.height <667,
          iPhone6 = reg && window.screen.height>480
            && window.screen.height<736,
          iPhone6P = reg && window.devicePixelRatio==3.0 && window.screen.height==736;

        const device = [
          iPhone4,iPhone5,iPhone6,iPhone6P
        ];
        const arrDevice = ["iPhone4","iPhone5","iPhone6","iPhone6Plus"];
        for(let j = 0,l=device.length;j<l;j++){
          if(device[j]){
            return arrDevice[j];
          }
        }
        return "unknow";
      },
      iosVersion(): string {
        let os;
        if($.platform() !== 'ios') return 'unknow';
        if(ua.match(/iPhone/i)){
          os = ua.indexOf('os');
        }
        return ua.substr(os + 3, 5).replace('_','.');
      },
      androidVersion(): string {
        let match = ua.match(/android\s([0-9\.]*)/i);
        return match ? "android" + " "+match[1] : 'unknow';
      },
      isMobile(): boolean {
        return !!ua.match(/(iPhone|iPod|android|ios|iPad|windows phone|tablet)/i);
      },
      isPc(): boolean {
        return !$.isMobile();
      },
      isExist(value: any): boolean{
        return value !== null && value !== undefined && value !== '';
      },
      isNull(value: any): boolean {
        return value == null;
      },
      isUndefined(value: any): boolean {
        return value === undefined;
      },
      isNumber(num: any): boolean {
        return $.type(num) === 'number';
      },
      isNumberic(num: any): boolean{
        return /^-{0,1}\d*\.{0,1}\d+$/.test(num)
      },
      isPositiveInteger(num: any): boolean{
        return /^[1-9]+[0-9]*]*$/.test(num)
      },
      isInteger(num: any): boolean{
        return typeof num === 'number' &&
          isFinite(num) &&
          Math.floor(num) === num;
      },
      isUptoAdecimal(num: any): boolean{
        return /^(\d+)?([.]?\d{0,1})?$/.test(num)
      },
      lt(val1,val2): boolean {
        return val1 < val2;
      },
      inArray(val, arr): boolean{
        if(!$.isArray(arr)) return false;
        for(let i = 0;i < arr.length;i++){
          if(arr[i] == val){
            return true;
          }
        }
        return false;
      },
      isTouchDevice(): boolean{
        return 'ontouchstart' in root ||
          'DocumentTouch' in root && document instanceof DocumentTouch;
      },
      email(num): boolean{
        return reg.email.test(num);
      },
      hasLowerCase(str): boolean{
        return !!str.match(/^.*[a-z]+.*$/);
      },
      hasNumber(num: string): boolean{
        return !!num.match(/^.*[0-9]+.*$/);
      },
      hasCapital(str: string):boolean {
        return !!str.match(/^.*[A-Z]+.*$/);
      },
      isBrowser(): boolean{
        return !!(typeof root !== 'undefined' &&
          navigator !== undefined && root.document
        );
      },
      isFunction(fn): boolean {
        return $.type(fn) === 'function';
      },
      isEqual(val1, val2): boolean {
        return val1 === val2;
      },
      /**
       *  $.isLength('1');//false
       */
      isLength(value): boolean {
        return typeof value == 'number' && value > -1 && value % 1 ==0
      },
      size(val): number{
        return val.length;
      },
      isHttps(url: string): boolean{
        return location.protocol.indexOf('https') > -1 ||
          url.toLowerCase().indexOf('https') > -1;
      },
      //judge a given array's elements is unique or not
      isUnique(array): boolean{
        let arr = Array.isArray(array) && array.sort();
        for(let i = 0;i < array.length;i++){
          if(arr[i] === arr[i+1]){
            return false;
          }
        }
        return true;
      },
      isString(str): boolean{
        return $.type(str) === 'string';
      },
      isInt(num): boolean{
        return Math.round(num) === num;
      },
      isJson(jsonString): boolean{
        try {
          let o = JSON.parse(jsonString);
          if (o && typeof o === "object") {
            return o;
          }
        }
        catch (e) { }
        return false;
      },
      hasClass(element,className): boolean{
        if(element.classList)
          return element.classList.contains(className);
        else
          return new RegExp('(^| )' + className + '( |$)','gi').test(element.className)
      },
      isError(value): boolean{
        return oString.call(value) === '[object Error]';
      },
      isChar(value): boolean{
        return $.isString(value) && value.length === 1;
      },
      /**
       * @examples
       *  judge.isArguments(function(){ return arguments;}());//true
       */
      isArguments(value): boolean {
        let args = '[object Arguments]';
        return $.isArrayLikeObject(value) && Object.hasOwnProperty.call(value,'callee') &&
          (!Object.propertyIsEnumerable.call(value,'callee') || oString.call(value)== args);
      },
      /**
       * judge.isEmpty(null);//true
       */
      isEmpty(value): boolean{
        if($.isArray(value) || $.isString(value)){
          return (value.length <= 0);
        }else if($.type(value)=== null || $.type(value) === undefined){
          return true;
        }else if($.type(value) === 'number'){
          return false;
        }else if($.isObject(value)){
          for(let key in value){
            if(value.hasOwnProperty(key)) return false;
          }
        }
        return true;
      },
      qqNumber(num): boolean{
        return reg.qq.test(num);
      },
      phoneNumber(num): boolean{
        return reg.phone.test(num);
      },
      isLetter(str): boolean {
        if("" == str) return false;
        const l = /^[A-Za-z]+$/;
        return l.test(str);

      },
      isAlpha(str): boolean {
        const alp = /^[a-zA-Z0-9_]{1,}$/;
        return alp.test(str);
      },
      includeChinese(ch): boolean{
        return /[\u4e00-\u9fa5]/g.test(ch);
      },
      onlyChinese(ch): boolean{
        const myReg =/^[\u4e00-\u9fa5]{0,}$/;
        return myReg.test(ch);
      },
      onlyNumber(num): boolean {
        return /^\d+$/g.test(num);
      },
      /**
       *  judge obj is Dom elements.
       */
      isElement(obj): boolean{
        return $.isObject(obj) && obj.nodeType > 0;
      },
      //judge a given value is being null or undefined
      isSet(value): boolean{
        return value !== null && value !== (void 0)
      },
      isRegExp(reg): boolean{
        return $.type(reg) === 'regexp';
      },
      //judge your ID number ,case-insensitive
      idNumber(num): boolean{
        return (reg.id.test(num));
      },
      isEven(num: number): boolean{
        return num !== null && (num % 2 ===0);
      },
      isOdd(num: number): boolean {
        return (num % 2 === 1)
      },
      min(a: number, b: number): number{
        return (a < b ? a : b)
      },
      hasHash(url): boolean {
        url = url || window.location.href;
        let match = url.match(/#(.*)$/);
        let ends =  match ? match[1] : '';
        return (ends !== '');
      },
      getHash(url): string {
        url = url || window.location.href;
        let match = url.match(/#(.*)$/);
        return match ? match[1] : '';
      },
      //judge obj has contain the given key
      has(obj: object, key: string): boolean {
        return obj != null && Object.hasOwnProperty.call(obj, key);
      },
      zipCode(code): boolean {
        let reg = new RegExp(/[1-9]\d{5}(?!\d)/);
        return reg.test(code);
      },
      isChromium(): boolean {
        const chromium = "mozilla/&&applewebkit/&&chrome/&&safari/".split("&&");
        for (let i = 0; i < chromium.length; i++)
          if (ua.indexOf(chromium[i]) < 0)
            return false;
        return true;
      },
      isOnline(): boolean {
        return navigator.onLine;
      },
      hasSpecialChar(str): boolean{
        let pattern = str.match(/[^A-Za-z0-9\u4e00-\u9fa5]/);
        return !!pattern;
      },
      /**
       *  judge DOM Element's position
       *  1.judge.position(element).top
       *  =>return element's position of the distance from the top
       *  2.judge.position(element,parent).left
       *  =>return the element's position of the distance to the left
       */
      position(element, parent) : object{
        let pos = element.getBoundingClientRect();
        let top = document.documentElement.clientTop;
        let left= document.documentElement.clientLeft;
        if(parent){
          let l = element.offsetLeft,
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
      isNativeFn(fn): boolean {
        let regChar = /[\\^$.*+?()[\]{}|]/g,
          //match  host constructor
          isHostConstructor = /^\[object .+?Constructor\]$/,
          //judge value is a host object in IE9 or older
          isHostObj = function (value) {
            let result = false;
            if(value != null && typeof value.toString != 'function'){
              try {
                result = !! (value + '');
              }catch (e){}
            }
            return result;
          };
        let isNative = new RegExp('^' +
          funcTo.call(Object.hasOwnProperty).replace(regChar,'\\$&').replace(reg.nativeFn, '$1.*?') + '$');
        if(fn == null || fn == undefined){
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
      strLength(str: string): number {
        return String(str).replace(/[^\x00-\xff]/g,'aa').length;
      },
      isLeapYear(year: number): boolean {
        return ((year % 4) ==0) && ((year % 100) !==0) || (year % 400) ==0 ;
      },
      isDate(val): boolean {
        return oString.call(val) === '[object Date]';
      },
      isUrl(str: string): boolean {
        return!!str.match(reg.url);
      }
    };
  })();
  root.judge = judge;
  //if $ is undefined,point to judge
  root.$ === undefined && (root.$ = judge);

  return judge;
}));
