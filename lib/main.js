///**
// * Created by trigkit4 on 16/2/19.
// */
//requirejs.config({
//    paths: {
//        judge: '../lib/judge'
//    }
//});
//requirejs(['judge'], function (judge) {
//    var val = [{'name':'huang'},123],
//        arr = [val,456];
//    console.log(judge.inArray(val,arr));//true
//});
var a = 1,b= 2,c=3;
var arr = [a,b,c];
    for(var i =0;i<arr.length;i++){
        for(k in arr[i]){
            console.log(arr[i]);
        }
    }