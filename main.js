require.config({
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery-2.1.4",
        bootstrap: "../assets/bootstrap/js/bootstrap",
        cookie: "lib/jquery.cookie",
        text: "lib/text",
        tpls: "../tpls",
        template: "lib/template-web",
        datetimepicker: "../assets/bootstrap-datetimepicker/js/bootstrap-datetimepicker", //配置日期控件的路径
        datetimepickerLang: "../assets/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN", //配置日期控件语言包的路径
        uploadify: "../assets/uploadify/jquery.uploadify", //上传文件插件
        ueConf: "../assets/UEditor/ueditor.config", //富文本插件
        ueAll: "../assets/UEditor/ueditor.all" //富文本插件
    },
    shim: {
        bootstrap: {
            deps: ["jquery"]
        },
        datetimepickerLang: {
            deps: ["datetimepicker"]
        },
        uploadify: {
            deps: ["jquery"]
        },
        ueAll: {
            deps: ["ueConf"] //如果富文本报错,就再让他依赖ZeroClipboard.js文件,把这里的文件最后一个else干掉,让它暴露全局变量
        }
    }
})

require([
    "jquery",
    "teacher/List",
    "course/courseList",
    "course/courseAdd",
    "category/categoryList",
    "common/api", //ajax封装方法
    "common/personal",
    "cookie",
    "bootstrap",
    "datetimepicker",
    "datetimepickerLang",
    "common/myModal",
    "uploadify",
    "ueAll"
], function ($, teacherList, courseList, courseAdd, categoryList, api, personal) {
    $(".left .list-group").on("click", "a", function () {
        $(this).addClass("active").siblings().removeClass("active");
        var item = $(this).attr("item");
        switch (item) {
            case "teacher":
                teacherList();
                break;
            case "course":
                courseList();
                break;
            case "addCourse":
                courseAdd();
                break;
            case "category":
                categoryList(); //课程分类           
                break;
            case "chart":
                $(".right .menu-content").html("图表统计");
                break;
        }
    })
    $(".left .list-group a[item=teacher]").trigger("click");

    //2、展示用户名和用户头像？
    var userInfoStr = $.cookie("userInfo");
    if (!userInfoStr) {
        location.href = "login.html";
    }
    var userInfo = JSON.parse(userInfoStr);
    //把用户名和用户头像展示在页面指定位置
    $(".left img").attr("src", userInfo.tc_avatar);
    $(".left h4").html(userInfo.tc_name);

    //完成退出功能
    $(".link-logout").on("click", function () {
        api.post("logout", {}, function () { // 1.清除session--发送ajax请求
            // 2.清除cookie  用$.removeCookie("cookie值")方法
            // 3.页面跳转
            $.removeCookie("userInfo");
            location.href = "login.html";
        })
    })

    //完成个人中心
    $(".link-personal").on("click", function () {
        personal();
    })

})