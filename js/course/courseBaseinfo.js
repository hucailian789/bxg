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
                var html = template.render(courseBaseinfo, res.result);
                var $html = $(html);
                $(".right .menu-content").html($html);
                $html.on("change", ".select-top", function () {
                    var val = $(this).val(); //获取下拉框的值

                    //ajax请求获取第二个下拉框中的内容
                    $.get("/api/category/child", {
                        cg_id: val
                    }, function (res) {

                        if (!res) return $html.find(".select-child").html("");
                        if (res.code != 200) throw new Error(res.msg);

                        var str = "";
                        res.result.forEach(function (v) {
                            str += "<option value='" + v.cg_id + "'>" + v.cg_name + "</option>";
                        }); //遍历完成之后：str也就是最终的option标签-->放到页面中
                        $html.find(".select-child").html(str);
                    }).on("submit", "form", function (e) {
                        e.preventDefault();
                        var formData = $(this).seriasize();
                        $.post("/api/course/update/basic", formData, function () {
                            $(".left .list-group a[item=course]").trigger("click");
                        })

                    })
                })


            }
        })
    }

});