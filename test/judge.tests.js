/**
 * Created by trigkit4 on 16/4/10.
 */
var arr = [],obj = {},str = 'abc',bool = true,
    float = 3.14,int = -1,req=/a/,date = new Date(),
    fn = function () {};

QUnit.test("isArray", function (assert) {
    equal($.isArray(arr),true,"Array is array");
    equal($.isArray(obj),false,"Object is not Array");
    equal($.isArray(str),false,"String is not Array");
    equal($.isArray(bool),false,"Boolean is not Array");
    equal($.isArray(float),false,"float is not Array");
    equal($.isArray(date),false,"date is not Array")
});

QUnit.test("type", function (assert) {
    equal($.type(arr),'array','[] is Array');
    equal($.type(Object.create(null)),'object','Object.create(null) is Object');
    equal($.type(date),'date','new Date() is Date');
    equal($.type(float),'number','3.14 is number');
    equal($.type(req),'regexp','/abc/ is regexp');
    equal($.type(str),'string',"'abc' is string ");
    equal($.type(fn),'function','function() is function')
});
QUnit.test("isBrowser", function () {
    ok($.isBrowser(),"当前是浏览器 "+ $.isBrowser())
});
QUnit.test("browser", function (assert) {
    ok($.browser(),'当前您正在使用'+ $.browser());
    ok($.browser('isIE'),'我的浏览器是IE浏览器');
    ok($.browser('isIE6'),'我的浏览器是IE6');
    ok($.browser('isIE7'),'我的浏览器是IE7');
    ok($.browser('isIE8'),'我的浏览器是IE8');
    ok($.browser('isIE9'),'我的浏览器是IE9');
    ok($.browser('isIE10'),'我的浏览器是IE10');
    ok($.browser('isIE11'),'我的浏览器是IE11');
    ok($.browser('isMobileIE10'),'我的浏览器是Mobile IE10');
    ok($.browser('isMobileIE9'),'我的浏览器是Mobile IE9');
    ok($.browser('isMobileIE8'),'我的浏览器是Mobile IE8');

    ok($.browser('isChrome'),'我的浏览器是Chrome');
    ok($.browser('isSafari'),'我的浏览器是Safari');
    ok($.browser('isFirefox'),'我的浏览器是Firefox');
    ok($.browser('isIosChrome'),'我的浏览器是ios Chrome');
    ok($.browser('isIpadSafari'),'我的浏览器是ipad safari');
    ok($.browser('isEdge'),'我的浏览器是edge');
    ok($.browser('isSougou'),'我的浏览器是搜狗');
    ok($.browser('isLiebao'),'我的浏览器是猎豹');
    ok($.browser('isLiebaoMobile'),'我的浏览器是猎豹 mobile');
    ok($.browser('isWeiXin'),'我的浏览器是微信');
    ok($.browser('isUC'),'我的浏览器是UC');
    ok($.browser('isUCMobile'),'我的浏览器是UC mobile');
    ok($.browser('isBaidu'),'我的浏览器是百度');
    ok($.browser('isBaiduMobile'),'我的浏览器是百度 mobile');
    ok($.browser('isQQMobile'),'我的浏览器是QQ mobile');
    ok($.browser('isQQBrowser'),'我的浏览器是QQ');
    ok($.browser('isOpera'),'我的浏览器是Opera');
    ok($.browser('isMiuiBrowser'),'我正在使用MIUI内置浏览器');
    ok($.browser('isOppoBrowser'),'我正在使用OPPO内置浏览器');
    ok($.browser('isAndroidChrome'),'我的浏览器是android chrome');
    ok($.browser('isIosSafari'),'我的浏览器是ios safari');
});
QUnit.test("platform", function (assert) {
    ok($.platform()=='android',"你的手机系统是安卓");
    ok($.platform()=='iPad',"你正在使用iPad");
    ok($.platform()=='ios',"你的手机系统是ios");
    ok($.platform()=='windowsPhone',"你的手机是windows phone");
    ok($.platform()=='mac',"你正在使用Mac系统");
    ok($.platform()=='linux',"你正在使用Linux");
    ok($.platform()=='blackBerry',"你正在使用黑莓手机");
    ok($.platform()=='tablet',"你正在使用平台");
    ok($.platform()=='windows',"你正在使用windows");
    ok($.platform()=='androidTablet',"你正在使用androidTablet");
});
QUnit.test("isMobile", function (assert) {
    ok($.isMobile(),"当前网络是移动端");
    ok($.isPc(),'当前网络是PC端');
});
QUnit.test("iosDevice", function (assert) {
    ok($.iosDevice()=='iphone4','你当前的设备是iPhone4');
    ok($.iosDevice()=='iphone5','你当前的设备是iPhone5');
    ok($.iosDevice()=='iphone6','你当前的设备是iPhone6');
    ok($.iosDevice()=='iphone6Plus','你当前的设备是iPhone6Plus');

});
QUnit.test("isTouchDevice", function (assert) {
    ok($.isTouchDevice()==true,'你的设备是触屏设备');
    ok($.isTouchDevice()==false,'你的设备不是触屏设备');
});
QUnit.test("isNativeFunction", function (assert) {

    equal($.isNativeFn(Object.assert),false,'Object.assert不是原生函数');
    equal($.isNativeFn(Array.prototype.toString),true,'Array.prototype.toString是原生函数');
    equal($.isNativeFn(fn),false,'匿名函数function(){}不是原生函数')
});
QUnit.test("isIE8Plus", function (assert) {
    ok($.isIE8Plus()==true,"你的浏览器是IE8+");
    ok($.isIE8Plus(false)==true,"你的浏览器是IE8+，不包含IE8");
    ok($.isIE8Plus()==false,"你的浏览器不是IE8+");
    ok($.isIE8Plus(false)==false,"你的浏览器不是IE8+，不包含IE8")
});
QUnit.test("strLength", function (assert) {
    var str = '我爱China';
    ok($.strLength(str),'我爱China有'+ $.strLength(str) +'个字符(一个汉字两个字符)')
});
QUnit.test('isObject', function (assert) {
    var arr = new Array();
    equal($.isObject(arr),false,'new Array()不是Object');
    equal($.isObject(Object.create(null)),true,'Object.create(null)是Object');
    equal($.isObject(null),false,'null不是Object');
    equal($.isObject(req),false,'正则表达式不是Object');
    equal($.isObject(date),false,'new Date()不是Object');
    equal($.isObject(fn),false,'匿名函数不是Object');
    equal($.isObject(window),false,'window对象不是Object')
});
QUnit.test('isObjectLike', function (assert) {
    equal($.isObjectLike(arr),true,'空数组是ObjectLike');
    equal($.isObjectLike(date),true,'new Date()是ObjectLike');
    equal($.isObjectLike(window),true,'window是ObjectLike');
    equal($.isObjectLike(fn),false,'fn匿名函数不是ObjectLike')
});
QUnit.test("isArrayLike", function (assert) {
    equal($.isArrayLike(arguments),true,'arguments是ArrayLike');
    equal($.isArrayLike(document.body.children),true,'document.body.children是ArrayLike');
    equal($.isArrayLike(arr),true,'[]是ArrayLike');
    equal($.isArrayLike(Object.create([])),true,'Object.create([])是ArrayLike')
});
QUnit.test("isArrayLikeObject", function (assert) {
    equal($.isArrayLikeObject('abc'),false,'字符串abc不是ArrayLikeObject');
    equal($.isArrayLikeObject(document.body.children),true,'document.body.children是ArrayLikeObject')
});
QUnit.test("idNumber", function () {
    var id1 = '35050019970323505x';
    var id2 = 350500199303212031;
    var id3 = 3210001992021023;
    equal($.idNumber(id1),true,'35050019970323505x是合法的身份证');
    equal($.idNumber(id2),true,'350500199303212031是合法的身份证');
    equal($.idNumber(id3),false,'3210001992021023不是合法的身份证')
});

QUnit.test("isNull", function () {
    equal($.isNull(null),true,'null is null');
    equal($.isNull(Object.create(null)),false,'Object.create(null)不是null');
    equal($.isNull(void 0),true,'void 0是null')
});
QUnit.test("isUndefined", function () {
    var str;
    equal($.isUndefined(void 0),true,'void 0是undefined');
    equal($.isUndefined(str),true,'var str是undefined');
    equal($.isUndefined(undefined),true,'undefined 是undefined');
    equal($.isUndefined(null),false,'false 不是undefined')
});
QUnit.test("kernel", function () {
    ok($.kernel(),'你的浏览器内核是'+ $.kernel())
});
QUnit.test("iosVersion", function () {
    ok($.iosVersion(),'当前iOS系统版本是 '+ $.iosVersion())
});
QUnit.test("androidVersion", function () {
    ok($.androidVersion(),'当前安卓系统版本是'+ $.androidVersion())
});
QUnit.test('email', function () {
    var e1 = 'hwx.trigkit4@163.com';
    var e2 = 'hwx.trigkit.@gov.com';
    var e3 = "147829382@foxmail.com";
    equal($.email(e1),true,'hwx.trigkit4@163.com是合法的email邮件格式');
    equal($.email(e2),false,'hwx.trigkit.@gov.com不是合法的email邮件格式');
    equal($.email(e3),true,'147829382@foxmail.com是合法的email邮件格式')
});
QUnit.test("hasLowerCase/hasCaptial", function () {
    var str1 = '我爱CHINA',str2 = 'I love FE';
    equal($.hasLowerCase(str1),false,'我爱CHINA没有小写字母');
    equal($.hasLowerCase(str2),true,'I love FE有小写字母');
    equal($.hasCapital(str1),true,'我爱CHINA有大写字母')
});
QUnit.test("isBrowser", function () {
    ok($.isBrowser(),'当前是浏览器环境：'+ $.isBrowser())
});
QUnit.test("isHttps", function () {
    var url = 'HTTPS://www.weidian.com';
    equal($.isHttps(url),true,'HTTPS://www.weidian.com是https')
});
QUnit.test("phoneNumber", function () {
    var num = 1703597283,num2 = 15823192345;
    equal($.phoneNumber(num),false,'1703597283不是手机号码');
    equal($.phoneNumber(num2),true,'15823192345是手机号码')
});
QUnit.test("hasHash/getHash", function () {
    var url = 'www.baidu.com#w';
    equal($.hasHash(url),true,"www.baidu.com#w有哈希值");
    ok($.getHash(url),'www.baidu.com#w的hasHash值是：'+ $.getHash(url))
});
QUnit.test("has", function () {
    var obj ={
        name:'trigkit4'
    };
    ok($.has(obj,'name'),"var obj={name:'trigkit4'}有name属性："+$.has(obj,'name'));
});
//QUnit.test("isUrl", function () {
//    var url = 'www.jd.d',link = 'https://www.google.hk',l = 'www.baidu.com';
//    equal($.isUrl(url),false,'www.jd.d不是有效的url');
//    equal($.isUrl(link),true,'https://www.google.hk是有效的URL');
//    equal($.isUrl(l),true,'http://localhost:63342/judge/test/index.html不是有效的URL')
//});
QUnit.test("zipCode", function () {
    var zipcode = 362014;
    equal($.zipCode(zipcode),true,'362014是合法的邮箱');
});
QUnit.test("isEmptyObject", function () {
    var obj = {name:'trigkit4'},obj2 = {};
    equal($.isEmptyObject(obj),false,"var obj = {name:'trigkit4'}不是空对象");
    equal($.isEmptyObject(obj2),true,'{}是空对象')
});
QUnit.test("isOnline", function () {
    ok($.isOnline(),'当前网络状况良好：'+ $.isOnline());
});
QUnit.test("include", function () {
    var str1 = 'microsoft',str2 = 'soft';
    equal($.include(str1,str2),true,'microsoft include soft')
});
QUnit.test('hasSpecialChar', function () {
    var str = '$%^&*(df',str2 = 'hello前端';
    equal($.hasSpecialChar(str),true,'$%^&*(df 有特殊字符');
    equal($.hasSpecialChar(str2),false,'hello前端 没有特殊字符')
});
QUnit.test("isRegExp", function () {
    equal($.isRegExp(/^(a,z)/i),true,'/^(a,z)/i 是正则表达式');
    equal($.isRegExp('/[a-z]/'),false," '/[a-z]/' 不是正则表达式")
});
QUnit.test("isChar", function () {
    equal($.isChar(arr),false,'[]不是char类型');
    equal($.isChar(fn),false,'fn不是char类型');
    equal($.isChar(str),false," 'abc'不是char类型 ");
    equal($.isChar('a'),true," 'a'是char类型 ")
});
QUnit.test('isEqual', function () {
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
    equal($.isEqual(str,str2,str3),true,"Boolean(true)和!!true，true是严格相等");
    equal($.isEqual(obj1,obj2,obj4),false,"{}和new Object(),Object.create(null)不是严格相等");
    equal($.isEqual(baz,obj3),false,"" +" "+
        "var foo = {name:'trigkit4'}" +"  "+
        "var bar = {age:23}" +"  "+
        "var baz = Object.assign(foo,bar)" +
        "var obj3 = {name: 'trigkit4',age: 23}"+"baz和obj3不是严格相等的"
    )
});
QUnit.test("isWindow", function () {
    ok($.isWindow(window),"window是window对象 " + $.isWindow(window))
});
QUnit.test("isDocument", function () {
    ok($.isDocument(document),"document是document对象 "+ $.isDocument(document))
});
QUnit.test("isPlainObject", function () {
    equal($.isPlainObject(date),false,'new Date()不是plain Object');
    equal($.isPlainObject(obj),true,'{}是plain Object');
    equal($.isPlainObject(arr),false,"[]不是plainObject")
});
QUnit.test("isDate", function () {
    ok($.isDate(date),"new Date()是日期")
});
QUnit.test("includeChinese",function () {
    var ch = "我爱China";
    equal($.includeChinese(ch),true,"我爱China包含中文");
});
QUnit.test("onlyChinese",function () {
    var ch = "我爱China";
    equal($.onlyChinese(ch),false,"我爱China不是只有汉字")
});
QUnit.test("onlyNumber", function () {
    var num = 3456789;
    equal($.onlyNumber(num),true,"3456789仅含有数字")
});
QUnit.test("qqNumber", function () {
    var qqNum = 345823122;
    equal($.qqNumber(qqNum),true,"345823122是有效的qq号码");

    var qqNum2 = 123;
    equal($.qqNumber(qqNum2),false,"123不是有效的qq号码")
});
QUnit.test("isLetter", function () {
    var str = '223',str2 = 'trigkit4',str3 = 'China';
    equal($.isLetter(str),false,"123不是英文字母");
    equal($.isLetter(str2),false,'trigkit4不是字母');
    equal($.isLetter(str3),true,"China是字母")
});
QUnit.test("isAlpha", function () {
    var str = 1,str2 = 'huang123_';
    equal($.isAlpha(str),true,"1是仅由字母数字下划线组成");
    equal($.isAlpha(str2),true,"huang123_是由字母数字下划线组成")
});

QUnit.test('isUrl',function () {
    var url1 = 'http://io.io',url2='360.cn',url3='www.baidu.com',url4='https://测试.com';
    equal($.isUrl(url1),true,'http://io.io是合法url');
    equal($.isUrl(url2),false,'360.cn不是合法的url');
    equal($.isUrl(url3),false,'www.baidu.com是合法的url');
    equal($.isUrl(url4),false,'测试.com不是合法的URL')
});