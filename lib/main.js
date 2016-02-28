/**
 * Created by trigkit4 on 16/2/19.
 */
requirejs.config({
    paths: {
        judge: '../judge'
    }
});
requirejs(['judge'], function (judge) {
    var val = [{'name':'huang'},123],
        arr = [val,456];
    console.log("requirejs实例(inArray):"+judge.inArray(val,arr));//true
});

