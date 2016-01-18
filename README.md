###`judge.js`

####This is a library for judging something
- No dependencies
- Support `AMD` & `Common.js`

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

judge current browser's kernel,whicth can judge 'webkit','gecko','IE','edge'

>`judge.platform()`
judge user's current device,whitch can judge:'Android','iPad','iPhone','windows phone'
,'Mac os X','Windows','Linux','qq','blackberry'

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

>'judge.isEmail(em)'

```js
var email = 'trigkit@163.com';
judge.isEmail(email);

=>true
```

- `judge.hasLowerCase()`
- `judge.hasNumber()`
- `hasCaptial()`










