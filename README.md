###`judge.js`

####This is a library for judging something
一个js判断库，大部分API返回布尔值，小部分API直接返回数值

- No dependencies
- Support `AMD` & `Common.js`
- light weight

```js
$ npm install #安装依赖
$ gulp compress #生成judge.min.js文件
```
## Getting started

Install judgejs using:

```js
$ npm install judgejs --save-dev
```
### Usage

```js

var judge = require('judgejs');

judge.vsersion

=>0.1.5

```

### API

>`judge.isArray(value)`


```js
judge.isArray(['foo','bar',{'name':'trigkit4'}])

=> true
```

>`judge.include(str,substr)`

```js
var str =  'microsoft';
var substr = 'soft';
judge.include(str,substr);

=>true
```
>`judge.isWeiXin()`

judge current browser is weixin's built-in browser or not

>`judge.kernel()`

judge current browser's kernel,whicth can judge：

可以检测的类型如下：

`webkit`,`gecko`,`IE`,`edge`


>`judge.platform()`

judge user's current device,whitch can judge:

可以检测的类型如下：

`Android`,`iPad`,`iPhone`,`windows phone`,`Mac os X`,`Windows`,`Linux`,`qq`,`blackberry`，`androidTablet`

>`judge.isExist(value)`

```js
var str =  null;
judge.isExist(str)
=>false


var str = '';
judge.isExist(str)
=>false
```

>`judge.isInt(num)`

```js
var num = 3.14;
judge.isInt(num);

=>false
```

>`judge.inArray(val,arr)`

```js
var val = [{'name':'huang'},123],
    arr = [val,456];
judge.inArray(val,arr);

=>true
```

>`judge.isTouchDevice()`

judge current user's device is touch device or not

>`judge.isEmail(em)`

```js
var email = 'trigkit@163.com';
judge.isEmail(email);

=>true
```

- `judge.hasLowerCase()`
- `judge.hasNumber()`
- `judge.hasCaptial()`


>`judge.isBrowser()`

judge current client is browser or not;

>`judge.browser()`

judge current browser 

可以检测的类型如下：

```js
IE6、IE7、IE8、IE9，IE，Chrome，Firefox，Safari，360，Opera，maxthon，baidu,qq,sougou
```

>`judge.isFunction()`

judge a given value is function or not


```js
var fn = new Function ();
judge.isFunction(fn);

=>true
```

>`judge.isEqual()`

judge two values is strict equal or not 

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

>`judge.size(val)`

judge a given value's size

```
var val = '琅琊榜lyb';
judge.size(val);

=>6
```

>`judge.isHttps()`

judge the website is https or not 

>`judge.isUnique()`

judge a given array's elements is unique or not

```
var a = [1,2];
var arr = [1,2,3,4,a];
judge.isUnique(arr);

=>true
```

>`judge.isString()`

judge a given value is string or not 

>`judge.isObject()`

judge a given value is Object or not

>`judge.type()`

judge the given value's type

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

>`judge.hasClass()`

judge a given value has class or not

>`judge.isError(value)`

judge a given value is Error or not

>`judge.isChar()`

judge a given value is char or not

>`judge.isEmpty()`

judge a given value is empty or not;

null and undefined is regarded as empty;

the number "0" is regarded as not empty;

```js

var arr = [];//judge.isEmpty(arr); => true
var n = null;//judge.isEmpty(n); => true
var u = undefined;//judge.isEmpty(u); => true
var num = 0;//judge.isEmpty(num); => false
var obj = Object.create(null);//judge.isEmpty(obj); => true
var str = '';//judge.isEmpty(str); => true

```

> `judge.isQQ`

```js
judge a given number is QQ number or not

var qq = 345812345;
judge.isQQ(qq);

=>true
```

>`judge.jsPhoneNum`

```js
var num = 13055503789;
judge.isPhoneNum(num);

=>true
```
>`judge.includeChinese`

```js
var ch = '23ef脚本';
judge.isIncludeChinese(ch);

=> true
```

>`judge.onlyChinese(ch)`

```
var ch = 'dd中国';
judge.onlyChinese(ch);

=>false
```

>`judge.isElement(element)`

judge a given element is HTMLelement or not

>`judge.isSet(value)`

judge a given value is being null or undefined


>`judge.isRegExp(reg)`

judge a given value is RegExp or not 

```js
var reg = /^(a,z)/i;
judge.isRegExp(reg);

=> true
```
>`judge.isIdNumber(id)`

judge your ID number  true or false

```js
var id = 350500199703235051;
judge.isIdNumber(id);

=> true
```

>`judge.isOdd(num)`

judge a given value is odd or not 

>`judge.isEven(num)`

judge a given value is even or not 




>`judge.assert(value,desc)`

you can use `judge.assert` to assert  the value you want  assert , and if the value pass assert , the description will show green;else show red;

```js
function add(a,b){
    return a + b;
}
var a = 1,b=2;

judge.assert(add(1,2) === 3,'true');
judge.assert(add(2,3) === 6,'false');

```

In the param `desc`  to write your own test expressions.

>`judge.hasHash(url)`
judge a url has hash value or not

```js
var url = 'www.baidu.com#w';
judge.hasHash(url);

=> true
```

>`judge.has(obj,key)`

judge obj has contain the given key


```js

var obj ={
    name:'trigkit4'
};
judge.has(obj,'name');

=>true
```

>`judge.isUrl(url)`

judge a value is url or not 

```js

var url = 'www.jd.d';
judge.isUrl(url);

=>false
```

>`judge.zipCode(code)`

judge a given value is China zipcode or not

```js
var zipcode = 362014;
judge.zipCode(zipcode);

=>true
```
>`judge.isMobile()`

judge user device is mobile(ipad,iphone,ipod,android) or not;

>`judge.isPc()`

judge user device is PC or not


>`judge.isChromium()`

judge user's browser is chrome kernel browser

