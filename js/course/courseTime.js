define([
    'jquery',
    'text!tpls/courseTime.html',
    'template'
], function ($, courseTime, template) {
    return function (id) {
        $.ajax({
            url: "/api/course/lesson",
            type: "get",
            data: {
                cs_id: id
            },
            success: function (res) {
                if (res.code != 200) throw new Error(res.msg);
                var html = template.render(courseTime, res.result);
                $(".right .menu-content").html(html);
            }
        })
    }

});