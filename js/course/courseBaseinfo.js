define([
    'jquery',
    'text!tpls/courseBaseinfo.html',
    'template'
], function ($, courseBaseinfo, template) {
    return function (id) {
        $.ajax({
            url: "/api/course/basic",
            type: "get",
            data: {
                cs_id: id
            },
            success: function (res) {
                if (res.code != 200) throw new Error(res.msg);
                var baseinfo = template.render(courseBaseinfo, res.result);
                $(".right .menu-content").html(baseinfo);
            }
        })
    }

});