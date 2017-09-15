define([
    'jquery',
    'text!tpls/categoryAdd.html',
    'template'
], function ($, categoryAddTip, template) {
    return function () {


        $.ajax({
            url: "/api/category/top",
            type: "get",
            success: function (res) {
                //手动往后台加一个数据放到首位
                res.result.unshift({
                    "cg_id": 0,
                    "cg_name": "顶级分类"
                })

                var html = template.render(categoryAddTip, res);
                var $html = $(html).on("submit", "form", function (e) {
                    e.preventDefault();
                    var formData = $(this).serialize();
                    $.ajax({
                        url: "/api/category/add",
                        type: "post",
                        data: formData,
                        success: function (data) {
                            if (data.code != 200) throw new Error(data.msg);
                            $html.modal("hide");
                            $(".left .list-group a[item=category]").trigger("click");
                        }
                    })
                }).myModal(); //调用自己写的common插件
            }
        })
    }
});