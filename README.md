###`judge.js`

####This is a library for judging something
- No dependencies
- Support `AMD` & `Common.js`
- light weight

```
$ node install #安装依赖
$ gulp compress #生成judge.min.js文件
```
### API

>`judge.array(value)`


```js

judge.array(['foo','bar',{'name':'trigkit4'}])

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

judge current browser's kernel,whicth can judge `webkit`,`gecko`,`IE`,`edge`

>`judge.platform()`

judge user's current device,whitch can judge:`Android`,`iPad`,`iPhone`,`windows phone`
,`Mac os X`,`Windows`,`Linux`,`qq`,`blackberry`

>`judge.isExist(value)`

```js
var str =  null;
judge.isExist(str)
=>false
```

>`judge.isInt(num)`

```js
var num = 3.14;
judge.isInt(num);

=>false
```

>`judge.isOnline()`

judge current state is online(true) or offline(false)

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

>`judge.isFunction()`

judge a given value is function or not


>`judge.isEqual()`

judge two values is strict equal or not 

>`judge.size()`

judge a given value's size



>`judge.isHttps()`

judge the website is https or not 

>`judge.isUnique()`

judge a given array's elements is unique or not

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

```
judge a given number is QQ number or not

var qq = 345812345;
judge.isQQ(qq);

=>true
```

>`judge.jsPhoneNum`

```
var num = 13055503789;
judge.isPhoneNum(num);

=>true
```
>`judge.isIncludeChinese`

```
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

```
var reg = /^(a,z)/i;
judge.isRegExp(reg);

=> true
```
>`judge.isIdNumber(id)`

judge your ID number  true or false

```
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

```
function add(a,b){
    return a + b;
}
var a = 1,b=2;

judge.assert(add(1,2) === 3,'true');
judge.assert(add(2,3) === 6,'false');

```

In the param `desc`  to write your own test expressions.

show more case , open `index.html`;
