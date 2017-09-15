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
        datetimepickerLang: "../assets/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN" //配置日期控件语言包的路径
    },
    shim: {
        bootstrap: {
            deps: ["jquery"]
        },
        datetimepickerLang: {
            deps: ["datetimepicker"]
        }
    }
})

require(["jquery", "teacher/List", "course/courseList", "category/categoryList",
    "cookie", "bootstrap", "datetimepicker", "datetimepickerLang", "common/myModal"
], function ($, teacherList, courseList, categoryList) {
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
                $(".right .menu-content").html("添加课程");
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

})