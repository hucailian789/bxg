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

9.ajax里面嵌套ajax在什么情况下会用: 有2种数据来自于2个接口,而这些数据都要一起渲染到同一个模板中.就要使用嵌套.所以要把一个ajax的返回值放到另外一个ajax的返回值里面.
    $.ajax({
        url:"第一个路径",    //获取基本信息
        success:function(resOld){
            $.ajax({
                url:"第二个路径",    //获取上级分类信息
                success:function(res){
                    //本来只需要渲染上级分类,所以传入res渲染一下,但是还有一个数据resOld,也要渲染上去.解决方案有2种: 把2个数据放到一起.
                        a. {old:resOld.result, top:res} 这样写不好,影响了之前的代码格式
                        b. 把resOld里面的数据放置到res中: res.old = resOld.result;这时候不仅可以获取上级分类,还能获取到分类原来的基本信息.原来的基本就通过old来获取. {{old.tc_name}}
                    var html = template.render(catEditTpl.res);
                }
            })
        }
    })

10.入口函数 创建出的来DOM元素是指向不同的内存地址.
 var $1 = $("<input/>");
 var $2 = $("<input/>");
 console.log($1[0] == $2[0]);//false  

11.jquery自己写的插件,叫做二次开发.
    1.工具类的方法: $.cookie  $.fn = function(){} --调用$.fn();
    2.Dom操作方法: $().modal();  $().css();
        $.fn.myModal = function(){}---调用 $().myModal();

12.- 下拉框联动
	- 需求：选择第一个下拉框里面的某一项，从而改变第二个下拉框中的内容
	
	- 事件绑定：给第一个分类的下拉框绑定change事件


	- 根据选中的该项的内容决定第二个下拉框的内容
		- 获取该项的内容：$(this).val();
		- 如何根据该项的内容获取第二项的内容(数据-->服务器)：
			- ajax请求：/api/category/child
	- 把第二项的内容更新到页面中
		- 动态拼接DOM元素

13、上传课程图片
- 找到功能的入口：点击课程列表中的图片
	- 给图片绑定事件
		- 事件绑定在容器中，通过事件委托让a触发
			-->容器应该是一个会被删除的容器，千万不要绑定在body/.main
- 事件触发的时候，进入到课程图片模块，渲染出课程图片页面
	- 1、页面的结构
		- 准备一个课程图片的模板文件，通过text插件获取模板内容
	- 2、页面的数据
		- 通过ajax获取相应的接口
			- 参数：cs_id
	- 3、把数据放到页面中：使用arttemplate编译模板，获取真实内容
	- 4、把真实的内容渲染到页面指定位置

14.退出功能分析
    1.从index.html跳转到login.html
    2.如果只有跳转,那么用户还可以随意进入index.html
        正确的逻辑:退出时,解除登录状态
             前端:要做的是清除cookie  让用户不能直接进入index.html
             如果前端要删除session值必须发送ajax请求.
             后端:要做的是清除session 服务器端是通过session判断用户权限的

步骤: a.找到功能入口:点击退出按钮
        给按钮绑定单击事件.按钮是在index.html直接渲染的,所以js代码应该写在main.js中
      b.事件触发的时候:
            1.清除session--发送ajax请求
            2.清除cookie  用$.removeCookie("cookie值")方法
            3.页面跳转

15.个人中心分析
    1.找到功能入口:点击个人中心
        给按钮绑定点击事件,弹出模态框,
            a.页面布局
            b.准备数据
            c.把数据放到页面中
            d.把真实内容以模态框呈现在页面中
    2.提交表单
        把表单变成异步的表单,给表单绑定submit事件, e.preventDafault();
        获取表单数据 var formData = $(this).serialize();
        通过ajax方法提交表单
            成功之后,修改cookie值, 然后再刷新页面.
            怎么修改cookie值,首先要自己去获取一下cookie值,从formData中找到tc_name值
            function getName(formData){
                var datas = formData.split("&");    这里面得到的是字符串以&号连接的
                datas.forEach(function(v){           找到tc_name开头的那个
                    var keyValues = v.split("=");
                    var key = keyValues[0];
                    var value = keyValus[1];
                    if(key == "tc_name"){
                        result
                    }
                })
            }

var tc_name = getName(formData);
var userInfoStr = $.cookie("userInfo");     获取原来的cookie值
var userInfoStr = JSON.parse( userInfoStr);  2、把原来的cookie值反序列化为JSON象
userInfoObj.tc_name = tc_name;  3、修改对象中的tc_name属性
userInfoStr = JSON.stringify(userInfoObj); 4、把全新的对象序列化为一个JSON数据
$.cookie("userInfo",userInfoStr);   5、把新的JSON数据存储到cookie中
    
location.reload();         //真刷新
rich text editor：富文本编辑器

 //添加到页面中之后再去渲染富文本编辑器
var ue = UE.getEditor('introduceContainer');
ue.ready(function(){
    ue.setContent(res.result.tc_introduce);     //富文本框里面的内容只能手动添加到页面上去
})

16.Echarts插件--百度基于canvas开发的.类似的还有highcharts