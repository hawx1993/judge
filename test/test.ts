const $ = require('../judge.ts')
const expect = require('chai').expect;
const num = 123, str = 'judge', obj = {name: 'judge',version: '0.9.6'},
  array = ['1','judge',{}], arrayLikeObject = { 0:'judge',length: 1},
  emptyObject = {};

describe('judgejs Api test', ()=> {
  it('$.isArray()', () => {
    expect($.isArray(obj)).to.not.be.ok;
    expect($.isArray(array)).to.be.ok;
    expect($.isArray(str)).to.not.be.ok
    expect($.isArray(num)).to.not.be.ok
  })
  it('$.isWindow()', () => {
    expect($.isWindow({})).to.not.be.ok;
    expect($.isWindow(global)).to.not.be.ok;
  })
  it('$.isObject()', () => {
    expect($.isObject(obj)).to.be.ok;
    expect($.isObject(array)).to.not.be.ok;
    expect($.isObject(num)).to.not.be.ok;
    expect($.isObject(arrayLikeObject)).to.be.ok;
  })
  it('$.isObjectLike()', () => {
    expect($.isObjectLike(arrayLikeObject)).to.be.ok;
    expect($.isObjectLike(global)).to.be.ok;
    expect($.isObjectLike(array)).to.be.ok;
    expect($.isObjectLike(num)).to.not.be.ok;
  })
  it('$.isEmptyObject()', () => {
    expect($.isEmptyObject(emptyObject)).to.be.ok;
    expect($.isEmptyObject(global)).to.not.be.ok;
    expect($.isEmptyObject(arrayLikeObject)).to.not.be.ok;
    expect($.isEmptyObject(obj)).to.not.be.ok;
    expect($.isEmptyObject(undefined)).to.be.ok;
  })
  it('$.isPlainObject()', () => {
    expect($.isPlainObject(emptyObject)).to.be.ok;
    expect($.isPlainObject(global)).to.not.be.ok;
    expect($.isPlainObject(new Object('judgejs'))).to.not.be.ok;
    expect($.isPlainObject(obj)).to.be.ok;
  })
  it('$.include()', () => {
    expect($.include('hello Judge','judge')).to.not.be.ok;
    expect($.include('123', '1')).to.be.ok;
  })
  it('$.isArrayLike()', () => {
    expect($.isArrayLike(arrayLikeObject)).to.be.ok;
    expect($.isArrayLike(obj)).to.not.be.ok;
    expect($.isArrayLike(emptyObject)).to.not.be.ok;
    expect($.isArrayLike(array)).to.be.ok;
  })
  it('$.isArrayLikeObject()', () => {
    expect($.isArrayLikeObject(arrayLikeObject)).to.be.ok;
    expect($.isArrayLikeObject(obj)).to.not.be.ok;
    expect($.isArrayLikeObject(emptyObject)).to.not.be.ok;
    expect($.isArrayLikeObject(array)).to.be.ok;
  })
  it('$.isError()', () => {
    expect($.isError(new Error())).to.be.ok;
    expect($.isError(new Array(1))).to.not.be.ok;
  })
  it('$.isEqual()', () => {
    expect($.isEqual([],[])).to.not.be.ok;
    expect($.isEqual(1,2)).to.not.be.ok;
    expect($.isEqual('judge','js')).to.not.be.ok;
    expect($.isEqual({'name': 'judge'},{'name': 'judge'})).to.not.be.ok;
  })
  it('$.email()', () => {
    expect($.email('trigkit@163.com')).to.be.ok;
    expect($.email('www.baidu.com')).to.not.be.ok;
    expect($.email('hwx@judge.or')).to.be.ok;
  })
  it('$.inArray()', () => {
    expect($.inArray(1,[1])).to.be.ok;
    expect($.inArray({},{})).to.not.be.ok;
    expect($.inArray('hello', ['hello', 'world'])).to.be.ok;
  })
  it('$.qqNumber()', () => {
    expect($.qqNumber(123456789)).to.be.ok;
    expect($.qqNumber(1234)).to.not.be.ok;
    expect($.qqNumber(1234567890101)).to.not.be.ok;
  })
  it('$.phoneNumber()', () => {
    expect($.phoneNumber('13054303578')).to.be.ok;
    expect($.phoneNumber(15878234374)).to.be.ok;
    expect($.phoneNumber(179576823411)).to.not.be.ok;
  })
  it('$.onlyNumber()', () => {
    expect($.onlyNumber('13054303578')).to.be.ok;
    expect($.onlyNumber('judge95')).to.not.be.ok;
    expect($.onlyNumber(num)).to.be.ok;
  })
  it('$.onlyChinese()', () => {
    expect($.onlyChinese('13054303578')).to.not.be.ok;
    expect($.onlyChinese('判断')).to.be.ok;
    expect($.onlyChinese('judge')).to.not.be.ok;
  })
  it('$.isFunction()', () => {
    expect($.isFunction(new Function ())).to.be.ok;
    expect($.isFunction(() => {} )).to.be.ok;
    expect($.isFunction('judge')).to.not.be.ok;
  })
  it('$.isUnique()', () => {
    expect($.isUnique([1,2,3,'3'])).to.be.ok;
    expect($.isUnique([1,2,2])).to.not.be.ok;
    expect($.isUnique(['judge','js', '[js]'] )).to.be.ok;
  })
  it('$.isString()', () => {
    expect($.isString(str)).to.be.ok;
    expect($.isString([1,2,2])).to.not.be.ok;
    expect($.isString(String(1))).to.be.ok;
  })
  it('$.isJson()', () => {
    expect($.isJson(obj)).to.not.be.ok;
    expect($.isJson(arrayLikeObject)).to.not.be.ok;
    expect($.isJson(emptyObject)).to.not.be.ok;
    expect($.isJson('{ "name": "judgejs", "author": "trigkit4"}')).to.be.ok;
    expect($.isJson({ "name": "judgejs", "author": "trigkit4"})).to.not.be.ok;
  })
  it('$.isEmpty()', () => {
    expect($.isEmpty(emptyObject)).to.be.ok;
    expect($.isEmpty([])).to.be.ok;
    expect($.isEmpty(Object.create(null))).to.be.ok;
    expect($.isEmpty(null)).to.be.ok;
    expect($.isEmpty({ "name": "judgejs", "author": "trigkit4"})).to.not.be.ok;
  })
  it('$.has()', () => {
    expect($.has({},'')).to.not.be.ok;
    expect($.has({"name": "trigkit4"}, "name")).to.be.ok;
    expect($.has({0: "judgejs"}, 0)).to.be.ok;
  })
  it('$.has()', () => {
    expect($.zipCode(310000)).to.be.ok;
    expect($.zipCode("310000")).to.be.ok
  })
  it('$.isEven()', () => {
    expect($.hasSpecialChar('husd78&^%')).to.be.ok;
    expect($.hasSpecialChar("310000")).to.not.be.ok
  })
  it('$.isEven()', () => {
    expect($.isEven('90')).to.be.ok;
    expect($.isEven(90)).to.be.ok
    expect($.isEven(91)).to.not.be.ok
  })
  it('$.isOdd()', () => {
    expect($.isOdd(num)).to.be.ok;
    expect($.isOdd("1")).to.be.ok
    expect($.isOdd("12")).to.not.be.ok
  })
  it('$.strLength()', () => {
    expect($.strLength(num)).to.be.equal(3);
    expect($.strLength("1")).to.be.equal(1)
    expect($.strLength("12")).to.be.equal(2)
  })
})
