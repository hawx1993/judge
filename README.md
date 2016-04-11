## `judge.js`
一个用来做判断的js类库

- 没有任何依赖
- 支持 `AMD` & `CommonJS`
- 轻量级（10kb）

```js
$ npm install #安装依赖
$ gulp compress #生成judge.min.js文件
```

>DEMO:http://hawx1993.github.io/judge/test/

## 开始

>使用`npm`安装`judgejs`：

```js
$ npm install judgejs
```

>使用`bower` 安装`judgejs`

```js
$ bower install judgejs  
```

# 目录
* [使用方法](#使用方法)
* [数据类型判断](#数据类型判断)
* [平台判断](#平台判断)
* [设备判断](#设备判断)
* [存在性和信息校验](#存在性和信息校验)

### 使用方法


```js
var judge = require('judgejs');

judge.version

<<<<<<< HEAD
=>0.7.2
=======
=>0.8.0
>>>>>>> master
```


可以用`$`来代替`judge`。例如：

```js
require('../judge.js')

$.version;
<<<<<<< HEAD
=> 0.7.2
=======
=> 0.8.0
>>>>>>> master
```

# API



#### 数据类型判断

>`judge.isArray(value)`


```js
judge.isArray(['foo','bar',{'name':'trigkit4'}])

=> true
```

>`judge.isInt(num)`

```js
var num = 3.14;
judge.isInt(num);

=>false
```
>`judge.isError(value)`

判断给定值是否是`Error`

>`judge.isJson(json)`

判断给定值是否是`json`格式

```js
 var str = '{"name":"jack"}';
 judge.isJson(str);//false
 var json = JSON.parse(str);
 judge.isJson(json);//true
```    

>`judge.isFunction()`

判断给定值是否是函数：


```js
var fn = new Function ();
judge.isFunction(fn);

=>true
```
>`judge.isString()`

判断一个给定的值是否是字符串，返回布尔值

>`judge.isObject()`

判断一个给定的值是否是对象，返回布尔值; 


```js
var obj = Object.create(null);
judge.isObject(obj);//true

judge.isObject(undefined);//false
```    


>`judge.isObjectLike(value)`

判断参数value是否是`object-like`：

```js
judge.isObjectLike([NaN]);

=>true

judge.isObjectLike(null);

=>false
```

>`judge.isEmptyObject(obj)`

判断是否为空对象

```js
var obj = Object.create(null);
$.isEmptyObject(obj);
```


>`judge.type()`

判断值的类型，包括：

`array,object,number,string,null,undefined,function,boolean,regexp`

```js
var arr = new Array;
judge.type(arr);//array

var obj = {};
judge.type(obj);//object

var num = Number(1);
judge.type(num);//number

var str = '123';
judge.type(str);//string

var n = null;
judge.type(n);//null


var u = undefined;
judge.type(u);//undefined

var fn = function () {};
judge.type(fn);//function

var bool = Boolean();
judge.type(bool);//boolean

var proto = Object.prototype;
judge.type(proto);//object

function Person(){}
var p1 = new Person();
judge.type(p1);//object
```    
>`judge.isEqual()`

判断两个给定值是否是严格相等：

```js
var judge = require('judgejs');
var str = Boolean(true);
var str2 = !!true;
var str3 = true;

var obj1 = {};
var obj2 = new Object();
var obj4 = Object.create(null);

var foo = {name:'trigkit4'};
var bar = {age:23};
var baz = Object.assign(foo,bar);
var obj3 = {
    name: 'trigkit4',
    age: 23
};

judge.isEqual(str,str2,str3);//true
judge.isEqual(obj1,obj2,obj4);//false
judge.isEqual(baz,obj3);//false,refer address different
```


>`judge.isChar()`

判断给定值是否是字符

>`judge.isRegExp(reg)`

判断给定值是否是RegExp对象：


```js
var reg = /^(a,z)/i;
judge.isRegExp(reg);

=> true

judge.isRegExp('/[a-z]/');

=>false
```

>`judge.isLength(value)`

判断`value`是否是有效的类数组长度

```js
judge.isLength(Infinity);

=>false

var arr = Number([]);
judge.isLength(arr);

>true
```

>`judge.isWindow(obj)`

判断是否是window对象。

>`judge.isDocument()`

判断是否是Document对象


>`judge.isPlainObject(obj)`

判断`obj`是否是纯粹的对象，纯粹的对象是通过`{}`创建或者通过`new Object()`创建

```js
judge.isPlainObject(window);

=>false

var arr = Number([]);
judge.isPlainObject(arr);

=>false

judge.isPlainObject(new Date());

=>false

judge.isPlainObject({});//true
```

>`judge.isArrayLike(obj)`

判断`obj`是否是类数组对象（类数组对象被限定为拥有非负整数属性的对象，NodeList,arguments，Array等）：

```js
judge.isArrayLike(document.body.children);

=>true

var obj = [{name:'null'}];
judge.isArrayLike(obj);

=>true

judge.isArrayLike(null);

=>false
```

>`judge.isArrayLikeObject(value)`

和`judge.isArrayLike`类似，但`isArrayLikeObject`会检测`value`是否是对象

```js
judge.isArrayLikeObject('abcd');//false
judge.isArrayLikeObject(document.body.children);//true
```

>`judge.isArguments(value)`

判断参数value是否是一个`arguments`对象：

```js
judge.isArguments(function(){ return arguments;}())

=>true
```


>`judge.isSet(value)`

判断给定值是否不为`null`和`undefined`




>`judge.idNumber(id)`

判断你的身份证号码是否符合规范，其中X不区分大小写：

```js
var id = '35050019970323505x';
judge.idNumber(id);

=> true
```

>`judge.isOdd(num)`

判断给定值是否是奇数，返回布尔值


>`judge.min(a,b)`

判断给定的数值中谁是最小值，并返回最小值

```js
judge.min(0,-1);
=>-1
```

>`judge.isEven(num)`

判断一个给定的值是否是偶数，返回布尔值

```js
$.isEven(null);

=>false
```
>`judge.isNull(value)`

```js
judge.isNull(void 0);

=>true

judge.isNull(null);

=>true
```
>`judge.isUndefined(value)`

```js
judge.isUndefined(null);

=>false

judge.isUndefined(void 0);

=>true
```

>`judge.isNumber(num)`

```js
judge.isNumber(Infinity);

=>true
```

#### 平台判断


>`judge.kernel()`

用于检测当前浏览器的内核（排版引擎），可以检测的类型如下：

`webkit`,`gecko`,`trident`,`edge`,`opera`
浏览器的内核分别用于检测Chrome浏览器，Firefox浏览器，IE浏览器，Edge浏览器和Opera浏览器

```js
if(judge.kernel() == 'webkit'){...} //引号处不能出现空格等不规范写法

```

>`judge.platform()`

检测用户当前设备，可以检测的类型如下：

`android`,`iPad`,`ios`,`windowsPhone`,`mac`,`windows`,`linux`,`blackBerry`，`tablet`,`androidTablet`


```js
if(judge.platform() == "androidTablet"){...}
```
参数也如上所示，千万不能写错，不然检测就会出现错误。参数采用驼峰命名法

>`judge.browser()`

检测当前浏览器类型，可以检测的类型如下：

```js
"IE6","IE7","IE8", "IE9", "IE10", "IE11","firefox","edge","sougou","liebao","liebao mobile","weixin","uc","mobile uc","baidu browser","mobile baidu","mobile qqbrowser","qqbrowser","opera","miui browser","oppo browser","mobile safari","android chrome", "ios chrome","chrome", "safari","ios safari","Mobile IE各个版本"
```
如需匹配不同平台的浏览器，需用`judge.platform()`再做一次匹配，使用场景可以是：

1.如果没有传入参数，则返回浏览器的名称，如：

```js
judge.browser();//你的浏览器是Chrome的话

=>Chrome
```

2.传入参数的情况下，返回布尔值，如:

```js
judge.browser("isChrome");

=>true
```

>参数如下所示，采用驼峰命名法：

```js
"isFirefox","isIosChrome","isIpadSafari", "isEdge", "isSougou","isLiebao",
"isLiebaoMobile","isWeiXin","isUC", "isUCMobile", "isBaidu",
"isBaiduMobile", "isQQMobile","isQQBrowser", "isOpera", "isMiuiBrowser",
"isOppoBrowser","isAndroidChrome","isChrome","isIosSafari","isSafari"

其中UC浏览器采用固定大写的写法。由于有的移动端浏览器采用和浏览器不同的ua，所以不能共用（无法单纯加一个`judge.isMobile()` or `judge.platform()=='android'`）。

//IE
"isIE","isMobileIE+数字（如：isMobileIE10）"，"isIE+数字(6~11)，如isIE10"

//for example
judge.browser("isIE11");//true,如果你的浏览器是IE11的话

```


>`judge.iosVersion()`

判断`iOS `系统版本号，返回数字形式的版本号：

```
judge.iosVersion();

=>9.0.2
```

>`judge.androidVersion()`

同上




>`judge.isChromium()`

判断用户的浏览器是否是套着`chrome`内核的浏览器，返回布尔值



#### 设备判断

>`judge.isMobile()`

判断用户设备是否是移动设备(ipad,iphone,ipod,android)

>`judge.isPc()`

判断用户设备是否是PC

>`judge.iosDevice()`

检测`iPhone`手机设备类型，可以检测如下类型的`iPhone`手机：

```js
iphone4(s) ,iphone5(s), iphone6(s),iphone6(s)Plus

if(judge.iosDevice=='iphone6Plus'){...}
```
参数为：`iphone4,iphone5,iphone6,iphone6Plus`

```js
$.iosDevice();//if your ios device is iphone6

=>iphone6
```
>`judge.androidDevice()`

检测安卓设备，现在只支持:mi4,魅族metal(mz-metal),魅族mx5，魅族mx3

TODO：准备支持更多安卓手机设备

>`judge.isTouchDevice()`

判断用户当前设备是否是触屏设备，返回布尔值Boolean

### 存在性和信息校验

>`judge.isExist(value)`

```js
var str =  null;
judge.isExist(str)
=>false

var str = '';
judge.isExist(str)
=>false
```

>`judge.lt(val1,val2)`

判断`val1`是否小于val2：

```js
judge.lt(1,-2);

=>false
```


>`judge.inArray(val,arr)`

判断参数`val`是否存在`arr`数组内：

```js
var val = [{'name':'huang'},123],
    arr = [val,456];
judge.inArray(val,arr);

=>true
```

>`judge.email(em)`

判断是否符合`Email`规范：

```js
var email = 'hwx.trigkit4@163.com';
judge.email(email);

=>true

var email2 = 'hwx.trigkit.@gmail.com';
judge.email(email2);
=>false
```

> `judge.hasLowerCase()`

判断是否含有小写字母：

```js
var str ='trigkit4';
judge.hasLowerCase(str);
```

> `judge.hasNumber()`

判断给定值是否含有数字：

```js
var num ='trigkit4';
judge.hasNumber(num);

=>true
```

> `judge.hasCapital()`

判断是否含有大写字母：

```js
var str ='trigkit4';
judge.hasCapital(str);
```

>`judge.isBrowser()`

判断当前客户端是否是浏览器，返回布尔值


>`judge.size(val)`

判断给定值的大小，返回数值：

```js
var val = '琅琊榜lyb';
judge.size(val);

=>6
```

>`judge.isHttps()`

判断当前站点是否是HTTPS，返回布尔值

>`judge.isUnique()`

判断一个给定数组的元素的值是否唯一：

```js
var a = [1,2];
var arr = [1,2,3,4,a];//[1,2,3,4,[1,2]];
judge.isUnique(arr);//true

var arary = ['1',1];
judge.isUnique(array);//true
```


>`judge.hasClass()`

判断给定值是否有class

> `judge.qqNumber()`

判断给定值是否符合QQ号规范，返回布尔值：

```js
var qq = 345812345;
judge.qqNumber(qq);

=>true
```

>`judge.phoneNumber`

判断给定值是否符合手机号规范：

```js
var num = 17755503789;
judge.phoneNumber(num);

=>true
```

>`judge.includeChinese`

判断给定值是否含有中文字符：

```js
var ch = 'js脚本';
judge.includeChinese(ch);

=> true
```

>`judge.onlyChinese(ch)`

判断给定字符是否仅有中文字符：
```
var ch = 'zh中国';
judge.onlyChinese(ch);

=>false
```

>`judge.onlyNumber()`

判断给定值是否只含有数字：

```js
var s = '233';
judge.onlyNumber(s);

=>true
```


>`judge.isElement(element)`

判断给定元素是否是DOM元素，返回布尔值

```js
var div = document.createElement('div');
judge.isElement(div);

=>true
```




>`judge.assert(value,desc)`

你可以使用`judge.assert` 去断言你想要断言的值，如果该值通过断言，描述不符将变为绿色，否则变为红色；

```js
function add(a,b){
    return a + b;
}
var a = 1,b=2;

judge.assert(add(1,2) === 3,'true');
judge.assert(add(2,3) === 6,'false');

```

在参数`desc` 部分去填写你的测试描述


>`judge.hasHash(url)`

判断一个给定的url是否有哈希值


```js
var url = 'www.baidu.com#w';
judge.hasHash(url);

=> true
```
>`judge.getHash(url)`

获取给定url链接的hash值

```js
var url = 'www.weidian.com#wd';
$.getHash(url);//wd
```

>`judge.has(obj,key)`

判断`obj`是否有包含给定的键（key）

```js

var obj ={
    name:'trigkit4'
};
judge.has(obj,'name');

=>true
```


>`judge.zipCode(code)`

判断给定值是否符合邮编规范：

```js
var zipcode = 362014;
judge.zipCode(zipcode);

=>true
```


>`judge.include(str,substr)`

```js
var str =  'microsoft';
var substr = 'soft';
judge.include(str,substr);

=>true
```

>`judge.isOnline()`

可用于判断设备是否联网，判断断网可用`judge.isOnline==false`，返回true，即断网

>`judge.hasSpecialChar()`

判断是否含有特殊字符，除了大小写字母、数字和汉字以外的字符都被视为特殊字符
```js
var char = 'a!@#$%';
judge.hasSpecialChar(char);

=>true
```

>`judge.isEmpty()`

判断给定值是否为空，`null`和`undefined`被视为空，
数字`0`被视为`非空`

```js
var arr = [];//judge.isEmpty(arr); => true
var n = null;//judge.isEmpty(n); => true
var u = undefined;//judge.isEmpty(u); => true
var num = 0;//judge.isEmpty(num); => false
var obj = Object.create(null);//judge.isEmpty(obj); => true
var str = '';//judge.isEmpty(str); => true
```
>`judge.position(element,parent)`

判断DOM元素位置，若只传入`element`参数，则返回其距离浏览器窗口的位置；
若传入`parent`参数，则返回其距离父元素的位置。兼容IE浏览器

`@{param}:parent` 可选

```js
judge.position(element).top ;//判断元素距离顶部位置
judge.position(element,parent).left;//判断元素距离父元素左边的位置
```

>`judge.isNativeFn(fn)`

判断`fn`是否是原生方法,不能有括号

```js
judge.isNativeFn(Object.assign);

=>true


var fn = new Function();
judge.isNativeFn(fn);

=>false


judge.isNativeFn(Array.prototype.filter)

=>true

var obj = {
        fn: function () {}
 };

judge.isNativeFn(obj.fn)

=>false
```

>`judge.isIE8Plus(boolean)`

判断当前浏览器是否是IE8+ (包含IE8)，直接返回布尔值

参数如下：

- true:包含IE8

```js
judge.isIE8Plus(true);//include IE8
```

- false:不包含IE8
```js

judge.isIE8Plus(false);//exclude IE8
```

没有参数，默认包含IE8

>`judge.strLength(str)`

判断字符长度，返回数字。一个中文字符被视为2，一个英文字符为视为1：

```js
judge.strLength('你好China');//9
```

>`judge.isLeapYear(year)`

判断是否是闰年

>`judge.isDate(val)`

判断是否是日期