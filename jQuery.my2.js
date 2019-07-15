// 先创建一个自调用函数 防止代码污染
;(function(){

    // 为了实现jquery的获取元素的效果 实际上就是一个方法
    // 方法就是指一个函数 一个以jQuery 为名字的函数
    // 这个函数的参数 就是css选择器
    function jQuery(selector){
        return new Init(selector);//为什么我们返回的是一个新建的实例对象？  因为们要使用到prototype来创建 jq对象中用到的方法
    }

    // 县创建一个构造函数
    function Init(selector){
        let list = document.querySelectorAll(selector);//然后我们发现 这个构造函数创建的实例 对象是一个空数组 我们要得到索引和长度
        for(let i = 0; i< list.length; i++){
            // 那么怎么把东西元素添加进来呢？
            this[i] = list[i];
        }
        // 获取长度
        this.length = list.length;
    }
    


    //为了让jQuery变成全局的
    window.jQuery = window.$ = jQuery;
})()


let box = $('.box');

console.log(box);
