###`judge.js`

####This is a library for judging something
- No dependencies
- Support `AMD` & `Common.js`
- light weight

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


    var arr = [];//judge.isEmpty(arr); => true
    var n = null;//judge.isEmpty(n); => true
    var u = undefined;//judge.isEmpty(u); => true
    var num = 0;//judge.isEmpty(num); => false
    var obj = Object.create(null);//judge.isEmpty(obj); => true
    var str = '';//judge.isEmpty(str); => true







