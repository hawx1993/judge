###`judge.js`

[EnglishDOC](./README_en.md)

####一个用来做判断的js类库

一个js判断库，大部分API返回布尔值，小部分API直接返回数值

- 没有任何依赖
- 支持 `AMD` & `CommonJS`
- 轻量级（5kb）

```js
$ npm install #安装依赖
$ gulp compress #生成judge.min.js文件
```
## 开始

使用npm安装`judgejs`：

```js
$ npm install judgejs --save-dev

```

# 目录
* [使用方法](#使用方法)
* [API](#API)
* [数据类型判断](#数据类型判断)
* [平台判断](#平台判断)
* [设备判断](#设备判断)
* [存在性和信息校验](#存在性和信息校验)

### 使用方法

```js
var judge = require('judgejs');

judge.version

=>0.3.0
```

### API

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

判断一个给定的值是否是对象，返回布尔值

```js
var obj = Object.create(null);
judge.isObject(obj);//true
```    

>`judge.type()`

判断值的类型，包括：

`array,object,number,string,null,undefined,function,boolean,object`

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
judge.isEqual(str,str2,str3);//true
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
```

#### 平台判断


>`judge.kernel()`

用于检测当前浏览器的内核（排版引擎），可以检测的类型如下：

`Webkit`,`Gecko`,`Trident`,`Edge`,`Opera`


>`judge.platform()`

检测用户当前设备，可以检测的类型如下：

`Android`,`iPad`,`iOS`,`Windows phone`,`Mac`,`Windows`,`Linux`,`Blackberry`，`AndroidTablet`

>`judge.browser()`

检测当前浏览器类型，可以检测的类型如下：

```js
"IE6","IE7","IE8", "IE9", "IE10", "IE11","Firefox","Edge","Sougou","Liebao","Liebao Mobile","Weixin","UC","Mobile UC","Baidu Browser","Mobile Baidu","Mobile QQBrowser","QQBrowser","Opera","MIUI Browser","Oppo Browser","Mobile Safari","Android Chrome", "iOS Chrome","Chrome", "Safari","Mobile IE各个版本"
```
如需匹配不同平台的浏览器，需用`judge.platform()`再做一次匹配，使用场景可以是：

```js
if(judge.browser()=="IE11"){...}
```

>`judge.isIE()`

判断浏览器是否是`IE`浏览器


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

判断用户设备是否是移动设备(ipad,iphone,ipod,android) ：

>`judge.isPc()`

判断用户设备是否是PC

>`judge.iosDevice()`

检测`iPhone`手机设备类型，可以检测如下类型的`iPhone`手机：

```
iphone4(s) ,iphone5(c/s), iphone6(s),iphone6(s) plus
```

>`judge.androidDevice()`

检测安卓设备，现在只支持:MI4

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

- `judge.hasLowerCase()`

- `judge.hasNumber()`

- `judge.hasCaptial()`


>`judge.isBrowser()`

判断当前客户端是否是浏览器，返回布尔值


>`judge.size(val)`

判断给定值的大小，返回数值：

```
var val = '琅琊榜lyb';
judge.size(val);

=>6
```

>`judge.isHttps()`

判断当前站点是否是HTTPS，返回布尔值

>`judge.isUnique()`

判断一个给定数组的元素的值是否唯一：

```
var a = [1,2];
var arr = [1,2,3,4,a];//[1,2,3,4,[1,2]];
judge.isUnique(arr);//true

var arary = ['1',1];
judge.isUnique(array);//true
```


>`judge.hasClass()`

判断给定值是否有class

> `judge.isQQ`

判断给定值是否符合QQ号规范，返回布尔值：

```js
var qq = 345812345;
judge.isQQ(qq);

=>true
```

>`judge.phoneNumber`

判断给定值是否符合手机号规范：

```js
var num = 17755503789;
judge.phoneNumber(num);

=>true
```

>`judge.tel(num)`

判断电话号码是否符合规范

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

>`judge.isSet(value)`

判断给定值是否不为`null`和`undefined`




>`judge.idNumber(id)`

判断你的身份证号码是否符合规范：

```js
var id = 350500199703235051;
judge.idNumber(id);

=> true
```

>`judge.isOdd(num)`

判断给定值是否是奇数，返回布尔值

>`judge.isEven(num)`


判断一个给定的值是否是偶数，返回布尔值



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

>`judge.has(obj,key)`

判断`obj`是否有包含给定的键（key）

```js

var obj ={
    name:'trigkit4'
};
judge.has(obj,'name');

=>true
```

>`judge.isUrl(url)`

判断一个给定的值是否是URL

```js

var url = 'www.jd.d';
judge.isUrl(url);

=>false
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

