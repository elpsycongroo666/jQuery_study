// 先创建一个自调用函数 防止代码污染
; (function () {

    // 为了实现jquery的获取元素的效果 实际上就是一个方法
    // 方法就是指一个函数 一个以jQuery 为名字的函数
    // 这个函数的参数 就是css选择器
    function jQuery(selector) {
        return new Init(selector);//为什么我们返回的是一个新建的实例对象？  因为们要使用到prototype来创建 jq对象中用到的方法
    }

    // 县创建一个构造函数
    function Init(selector) {
        let list = document.querySelectorAll(selector);//然后我们发现 这个构造函数创建的实例 对象是一个空数组 我们要得到索引和长度
        for (let i = 0; i < list.length; i++) {
            // 那么怎么把东西元素添加进来呢？
            this[i] = list[i];
        }
        // 获取长度
        this.length = list.length;
    }


    // 封装each方法 遍历数组
    Init.prototype.each = function(callback){
        for(let i =0 ; i < this.length; i++){
            callback(i,this[i]);//不确定遍历里面的逻辑 - 传回调函数回来
        }
    }


    // jq中的css方法 有两个功能 
    // 第一个 css(属性名,值) 设置属性
    // 第二个 css(属性名)获取该属性的值
    // 设置css属性
    Init.prototype.css = function (property, value) {
        // 如果没有第二个参数就是获取
        if (value == undefined) {
            return window.getComputedStyle(this[0])[property];
        } else {
            // 创建一个数组，里面存储了所有需要带单位的属性名
            // 简单这些带单位的
            let strArr = ['width', 'height', 'left', 'top'];
            // 要给每一个获取到的元素设置样式
            for (i = 0; i < this.length; i++) {
                if (strArr.indexOf(property) !== -1) {
                    //要判断它是不是输入带px
                    if (value.toString().indexOf('px') === -1) {//如果是-1 就代表这个字符串里面没有  要注意的是 传入的如果是数字的话 就要先用tostring()方法转成字符串
                        this[i].style[property] = value + 'px';//就加上
                    } else {
                        this[i].style[property] = value;
                    }
                } else {
                    this[i].style[property] = value;
                }
            }
        }
        // 最后返回this 实现链式编程
        return this;
    }


    //为了让jQuery变成全局的
    window.jQuery = window.$ = jQuery;
})()


let box = $('.box');
// 试用each方法
// box.each((i,e)=>{
//     console.log(i);
// })
// console.log(box);
// box.css('width','200px');
// box.css('height','200px');
// box.css('background','red');
// 试用css中的获取元素方法
// console.log(box.css('background'));
