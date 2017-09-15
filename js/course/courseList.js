define([
    'jquery',
    'text!tpls/courseList.html',
    'course/courseTime', //编辑课时
    'course/courseBaseinfo', //编辑基本信息
    'template',
    'course/courseTimeEdit', //编辑
    'course/courseTimeAdd' //添加课时
], function ($, courseListTip, courseTimeTip, courseBaseinfo, template, courseTimeEdit, courseTimeAdd) {
    return function () {

        $.ajax({
            url: "/api/course",
            success: function (res) {
                if (res.code != 200) throw new Error(res.msg);
                var courseHtml = template.render(courseListTip, res);
                var $courseHtml = $(courseHtml);
                $(".right .menu-content").html($courseHtml);
                //编辑课时--课时管理
                $courseHtml.on("click", ".btn-course-time", function () {
                        var cs_id = $(this).parent().attr("cs_id");
                        courseTimeTip(cs_id);
                    })
                    //编辑基本信息
                    .on("click", ".btn-course-baseinfo", function () {
                        var cs_id = $(this).parent().attr("cs_id");
                        courseBaseinfo(cs_id);
                    })
                    // 编辑
                    .on("click", ".btn-edit", function () {
                        courseTimeEdit();
                    })
                    //添加课时
                    .on("click", ".btn-add", function () {
                        courseTimeAdd();
                    })

            }
        })


    }

});