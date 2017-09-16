define([
    'jquery',
    'text!tpls/courseTime.html',
    'template',
    'course/courseTimeEdit'
], function ($, courseTime, template, courseTimeEdit) {
    return function f3(cs_id) {
        $.ajax({
            url: "/api/course/lesson",
            type: "get",
            data: {
                cs_id: cs_id
            },
            success: function (res) {
                if (res.code != 200) throw new Error(res.msg);
                var html = template.render(courseTime, res.result);
                var $html = $(html);
                $html.on("click", ".btn-edit", function () {
                    var ct_id = $(this).parent().attr("ct_id");
                    courseTimeEdit(ct_id, function () {
                        f3(cs_id);
                    })
                })
                $(".right .menu-content").html($html);
            }
        })
    }

});