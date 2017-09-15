define([
    'jquery',
    'text!tpls/categoryEdit.html',
    'template'
], function ($, categoryEditTip, template) {
    return function (id) {
        $.ajax({
            url: "/api/category/edit",
            type: "get",
            data: {
                cg_id: id
            },
            success: function (resOld) { //这种叫嵌套请求.先要获取之前的值,然后把
                $.ajax({
                    url: "/api/category/top",
                    type: "get",
                    success: function (resTop) {
                        //手动往后台加一个数据放到首位
                        resTop.result.unshift({
                            "cg_id": 0,
                            "cg_name": "顶级分类"
                        })
                        resTop.old = resOld.result; //把旧值附值到res的old里面.
                        var html = template.render(categoryEditTip, resTop);
                        var $html = $(html).on("submit", "form", function (e) {
                            e.preventDefault();
                            var formData = $(this).serialize();
                            $.ajax({
                                url: "/api/category/modify",
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
        })




    }

});