define([
    'jquery',
    'text!tpls/categoryList.html',
    'template',
    'category/categoryAdd', //添加分类
    'category/categoryEdit' //编辑
], function ($, categoryListTip, template, categoryAdd, categoryEdit) {
    return function () {
        $.ajax({
            url: "/api/category",
            type: "get",
            success: function (res) {

                var html = template.render(categoryListTip, res);
                var $html = $(html);
                //给添加分类绑定事件
                $html.on("click", ".btn-add", function () {
                        categoryAdd();
                    })
                    //编辑
                    .on("click", ".btn-edit", function () {
                        var cg_id = $(this).parent().attr("cg_id");
                        categoryEdit(cg_id);
                    })
                $(".right .menu-content").html($html);
            }
        })


    }

});