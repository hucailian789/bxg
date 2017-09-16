define([
    'jquery',
    'text!tpls/courseList.html',
    'course/courseTime', //编辑课时
    'course/courseBaseinfo', //编辑基本信息
    'course/courseImage', //课程图片
    'template'
], function ($, courseListTip, courseTimeTip, courseBaseinfo, courseImage, template) {
    return function () {

        $.ajax({
            url: "/api/course",
            success: function (res) {
                if (res.code != 200) throw new Error(res.msg);
                var html = template.render(courseListTip, res);
                var $html = $(html);
                $(".right .menu-content").html($html);
                //编辑课时--课时管理
                $html.on("click", ".btn-course-time", function () {
                        var cs_id = $(this).parent().attr("cs_id");
                        courseTimeTip(cs_id);
                    })
                    //编辑基本信息
                    .on("click", ".btn-course-baseinfo", function () {
                        var cs_id = $(this).parent().attr("cs_id");
                        courseBaseinfo(cs_id);
                    })
                    //课程图片
                    .on("click", "a", function () {
                        var cs_id = $(this).attr("cs_id");
                        courseImage(cs_id);
                    })


            }
        })


    }

});