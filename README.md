博学谷项目  
接口文档：http://doc.botue.com/
项目结构:
bxg/
    css/
        .less
    js/
        teacher/
            List.js
            add.js
        lib/    第三方独立的js文件
            jquery.js
            template-web.js
            echarts.js
    imgs/
    tpls/  模板文件
        teacherAdd.html
        courseAdd.html
    assets/ 存放第三方不 仅有js,还有其它一系列文件的项目
        bootstrap/
    index.html 项目的主面(用requirejs管理)
    login.html 登录面(并不使用requirejs)

   1. 在bootstrap中给一个标签设置一个类名为text-center就可以自动实现文字水平居中
     全局css样式--表单--
        id甚用
        btn-success绿色
        btn-primary 蓝色
        btn-danger 红色
        btn-info    天蓝色
        btn-block 可以让按钮随着容器变大而变大
        btn-sm 设置大小
        pull-right 右对齐
        col-md-offset-8  间隔8列

    2. h5中跨页面传值
        location.href = "index.html? id = 666&age=18"; 把传递的参数作为url请求路径的一部分
        location.href = "页面跳转";
        location.search  可以获取get的参数
        location.reload() 页面刷新
        location.hash   获取瞄点("#123")
        location.protocol 获取协议的名称("https:")
        location.host  获取域名
        location.pathname 获取指定路径

    cookie是用来跨页面访问数据,前提是必须要在同一个域名下面的不同页面.有两种类型:
    3. 用cookie保存一个数据, cookie值是基于会话机制存储的,随着会话的结束,该cookie值会消失.
        原生js帮我们解决cookie会话存储,可以长久保存.
        -1.设置一个会话cookie: document.cookie = "键 = 值".
        -2.设置一个长期cookie : document.cookie = "name = ccc;expires = "+new Date("延迟时时间2012-9-12 08:00:00")

        原生太复杂,所以就诞生了插件,但是cookie的插件要依赖于jquery.所以要先引入jquery才能引入jquery.cookie.js. 
        -1.设置一个会话cookie : $.cookie("键","值")  值应该是一个字符串类型或者数字类型
        -2.设置一个长期cookie :$.cookie("键","值",{expires:1});
        -3. 获取cookie的值直接用console.log($.cookie("gender"));
        -4. 移除一个cookie : $.removeCookie("gender");

        document.cookie = "id = 666";
        document.cookie = "name = ccc";
    4. 用cookie值  console.log(document.cookie)获取里面所有的值 .

    特别注意: cookie不能保存密码,尤其是不能明文保存密码,12306明文保存密码,数据库被攻陷了.


    5. 如何只想获取指定的值?
        用函数封装
            function getCookieByKey(key){
                var arr = document.cookie.split("; "); 先把取到的域名值切割出来,用数组来接收.
                arr.forEach(function(value){        查批指定的name值
                var keyValues = value.split("=");  再用=号分割
                if(keyValues[0]==key){              
                    result = keyValues[1];
                }

                })
                return result;
            }

        在服务器中要访问某个用户的详细信息? 
            user/info ,传入用户的id--通过ajax({type:"get/或者post",data:""})
        获取某个订单的详细信息?
        获取某个用户的头像?  --必须要知道用户是谁?可以根据用户的id/订单的id来获取值

        h5中新增了本地存储技术: localStorage永久存储 / sessionStorage 会话存储



        $(".menu").on("click","a",function(){})        事件委托的好处是减少点击次数
        给自己添加类名,给兄弟元素移除类名: $(this).addClass("active").siblings().removeClass("active");
        决断点击哪一个按钮有不同的类名可以用 $("类名").hasClass("类名");
        判断点击哪一个按钮有没有自定义属性     
        var item = $(this).attr("item");        //获取自定义属性
        switch(item){
            case "teacher":
                $(".main .content-container").html("");
                break;
             case "course":
                $(".main .content-container").html("");
                break;
             case "category":
                $(".main .content-container").html("");
                break;
             case "chart":
                $(".main .content-container").html("");
                break;
        }

        //默认点击讲师管理按钮?
            用模拟点击讲师管理按钮  $(".menu .list-group a[item= teacher]").trigger("click");  用trigger可以自动触发按钮的单击事件.

        阻止默认行为就可以阻止页面跳转,有两种方法
        1.通过事件回调函数的参数: e.preventDefault();
        2.在事件回调函数的末尾: return false

        JSON.stringifyj(res.result)可以把()里的值转换为字符串类型.
        localStorage.setItem("键", 值); 永久保存这个对象..值一定要是字符串类型或者是数字类型,
        JSON.parse(localStorage.getItem("userInfo")) 由字符串转换成json对象.
 
    profile 个人简介

    要查找js原生的方法:就去查MND的网页查找 .

    第二个.讲师管理
    使用模板 :
    template(scriptr的id,数据)
    template.render(id,数据);

    常见面试题:

    post/get请求之间的区别?
        get请求的参考作为url地址的一部分,相对不太安全,常用于一些安全性不高的参数(比如id). 
        get请求的地址受制于url的长度的限制,参考大小有一定的限制
        post请求的参数作为请求报文的一部分,相对比较安全,常用于一些安全性较高的数据.
        post请求的参数大小几乎没有限制.

    ajax的优缺点?
        异步刷新优点,只刷新页面的一部分内容.减少了资源的重复加载,
            1.页面的响应速度有一定的提升.
            2.降低了服务器的压力.

        缺点: ajax不能跨域.  对SEO搜索引擎优化不友好.
            百度是如何收录你的网站的? 如果通过搜索一个标题就能看到你网站指定的内容.网络爬虫搜索某个网站
        现在已经有了一些手段支持跨域:跨域的解决方案是 jsonp/反向代理/iframe/window.name

编辑讲师步骤:
找到功能入口,编辑讲师按钮,给按钮绑定点击事件,给每一个编辑按钮指定一个类名:btn-edit .事件绑定在div.panel中,通过事件委托让编辑按钮触发.当事件触发的时候,弹出模态框.准备一个模态框的模板.通过text插件获取模板内容.通过ajax获取讲师原来的数据.
